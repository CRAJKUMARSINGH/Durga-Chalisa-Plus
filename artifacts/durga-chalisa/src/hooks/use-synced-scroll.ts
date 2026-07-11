import { useState, useEffect, useRef, useCallback } from 'react';
import type { VerseLine } from '@/data/hindi-aarti';
import type { AudioSegment } from '@/hooks/use-audio-player';

const RESUME_DELAY_MS = 4000;
const LERP            = 0.07;

const BASE_WEIGHT: Record<VerseLine['type'], number> = {
  chaupai: 1.0,
  doha:    1.5,
  header:  0.0,
};

function buildTimeMap(
  container: HTMLElement,
  verses: VerseLine[],
  chaupaiWeight: number,
): Array<{ el: HTMLElement; startRatio: number; endRatio: number; offsetTop: number }> {
  const WEIGHT: Record<VerseLine['type'], number> = {
    ...BASE_WEIGHT,
    chaupai: chaupaiWeight,
  };
  const totalWeight = verses.reduce((s, v) => s + WEIGHT[v.type], 0);
  if (totalWeight === 0) return [];

  const map: Array<{ el: HTMLElement; startRatio: number; endRatio: number; offsetTop: number }> = [];
  let cum = 0;

  for (const v of verses) {
    const w = WEIGHT[v.type];
    if (w === 0) continue;
    const el = container.querySelector<HTMLElement>(`#verse-${v.id}`);
    if (!el) continue;
    const start = cum / totalWeight;
    cum += w;
    const end = cum / totalWeight;
    // offsetTop is relative to offsetParent — we need absolute position
    // within the scroll container. Walk up to get accurate position.
    let top = el.offsetTop;
    let parent = el.offsetParent as HTMLElement | null;
    while (parent && parent !== container) {
      top += parent.offsetTop;
      parent = parent.offsetParent as HTMLElement | null;
    }
    map.push({ el, startRatio: start, endRatio: end, offsetTop: top });
  }
  return map;
}

export function useSyncedScroll(
  scrollContainerRef: React.RefObject<HTMLElement | null>,
  audioRef: React.RefObject<HTMLAudioElement | null>,
  isActive: boolean,
  verses: VerseLine[],
  segment?: AudioSegment,
) {
  const [isFollowing, setIsFollowing] = useState(true);
  const rafRef       = useRef<number | null>(null);
  const lastApplied  = useRef<number | null>(null);
  const resumeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeMapRef   = useRef<ReturnType<typeof buildTimeMap>>([]);
  // Use a counter: increment to trigger a rebuild after DOM settles.
  const rebuildGen   = useRef(0);
  const builtGen     = useRef(-1);

  // Mark time-map stale whenever verses or segment change.
  useEffect(() => {
    rebuildGen.current += 1;
  }, [verses, segment]);

  // ── RAF loop ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isActive || !isFollowing) return;

    const tick = () => {
      const container = scrollContainerRef.current;
      const audio     = audioRef.current;

      if (container && audio && audio.duration > 0) {

        // Rebuild time-map when stale — but only AFTER scroll has reset to 0
        // (i.e. container.scrollTop is near 0), so offsetTop values are accurate.
        if (builtGen.current !== rebuildGen.current) {
          // Wait until the container is scrolled to top (segment reset happened)
          if (container.scrollTop < 10) {
            const cw = segment?.chaupaiWeight ?? 1.0;
            timeMapRef.current = buildTimeMap(container, verses, cw);
            builtGen.current   = rebuildGen.current;
          } else {
            // Not reset yet — keep scrollTop moving toward 0 and try next frame
            container.scrollTop = Math.max(0, container.scrollTop - 60);
            rafRef.current = requestAnimationFrame(tick);
            return;
          }
        }

        const map = timeMapRef.current;
        if (map.length === 0) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }

        // Segment window
        const segStart    = segment?.startTime      ?? 0;
        const segEnd      = segment?.endTime        ?? audio.duration;
        const scrollDelay = segment?.scrollDelaySec ?? 0;
        const segDur      = Math.max(segEnd - segStart, 1);
        const elapsed     = Math.max(0, audio.currentTime - segStart);

        // Hold at top during opening prayer (not in written text)
        if (elapsed < scrollDelay) {
          lastApplied.current = 0;
          container.scrollTop = 0;
          rafRef.current = requestAnimationFrame(tick);
          return;
        }

        // Map post-delay audio time to verse positions
        const scrollable = elapsed - scrollDelay;
        const scrollDur  = Math.max(segDur - scrollDelay, 1);
        const ratio      = Math.min(scrollable / scrollDur, 1);

        // Find active verse
        let activeIdx = 0;
        for (let i = 0; i < map.length; i++) {
          if (ratio >= map[i].startRatio) activeIdx = i;
          else break;
        }
        const active = map[activeIdx];
        const next   = map[activeIdx + 1];

        // Within-verse interpolation
        const span        = active.endRatio - active.startRatio;
        const withinVerse = span > 0 ? Math.min((ratio - active.startRatio) / span, 1) : 0;

        const activeOffsetTop = active.offsetTop;
        const nextOffsetTop   = next ? next.offsetTop : activeOffsetTop;
        const interpOffsetTop = activeOffsetTop + (nextOffsetTop - activeOffsetTop) * withinVerse;

        // Teleprompter sweet-spot: active verse at 28% from top
        const sweetSpot = container.clientHeight * 0.28;
        const rawTarget = interpOffsetTop - sweetSpot;
        const maxScroll = container.scrollHeight - container.clientHeight;
        const target    = Math.max(0, Math.min(rawTarget, maxScroll));

        // Smooth lerp
        const next_st = container.scrollTop + (target - container.scrollTop) * LERP;
        lastApplied.current = next_st;
        container.scrollTop = next_st;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isActive, isFollowing, scrollContainerRef, audioRef, verses, segment]);

  // ── Manual scroll detection ───────────────────────────────────────────────
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      const last = lastApplied.current;
      if (last != null && Math.abs(container.scrollTop - last) < 2) return;
      setIsFollowing(false);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      resumeTimer.current = setTimeout(() => setIsFollowing(true), RESUME_DELAY_MS);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', onScroll);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, [scrollContainerRef]);

  // ── Reset on play/pause ───────────────────────────────────────────────────
  useEffect(() => {
    if (resumeTimer.current) { clearTimeout(resumeTimer.current); resumeTimer.current = null; }
    setIsFollowing(true);
  }, [isActive]);

  // ── Resync button ─────────────────────────────────────────────────────────
  const resync = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setIsFollowing(true);
  }, []);

  return { isFollowing, resync };
}
