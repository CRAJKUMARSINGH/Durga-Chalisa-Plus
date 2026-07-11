import { useState, useEffect, useRef, useCallback } from 'react';
import type { VerseLine } from '@/data/hindi-aarti';
import type { AudioSegment } from '@/hooks/use-audio-player';

const RESUME_DELAY_MS = 4000;
const LERP            = 0.07; // per-frame easing — smooth cinema glide

// Time weight per verse type — how long each line "holds" relative to others.
const WEIGHT: Record<VerseLine['type'], number> = {
  chaupai: 1.0,
  doha:    1.5, // refrains are sung slower
  header:  0.0, // labels — not sung, excluded from time-map
};

/**
 * Pre-computes a time-map once when verses or DOM settle.
 * Returns array of { el, startRatio, endRatio } for chantable verses only.
 * Uses offsetTop (layout-stable) not getBoundingClientRect (scroll-dependent).
 */
function buildTimeMap(
  container: HTMLElement,
  verses: VerseLine[]
): Array<{ el: HTMLElement; startRatio: number; endRatio: number; offsetTop: number }> {
  const totalWeight = verses.reduce((s, v) => s + WEIGHT[v.type], 0);
  if (totalWeight === 0) return [];

  const map: Array<{ el: HTMLElement; startRatio: number; endRatio: number; offsetTop: number }> = [];
  let cum = 0;

  for (const v of verses) {
    const w = WEIGHT[v.type];
    if (w === 0) continue; // skip headers
    const el = container.querySelector<HTMLElement>(`#verse-${v.id}`);
    if (!el) continue;
    const start = cum / totalWeight;
    cum += w;
    const end = cum / totalWeight;
    map.push({ el, startRatio: start, endRatio: end, offsetTop: el.offsetTop });
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
  const rafRef      = useRef<number | null>(null);
  const lastApplied = useRef<number | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Cache the time-map — rebuild only when segment/verses change, not every frame.
  const timeMapRef  = useRef<ReturnType<typeof buildTimeMap>>([]);
  const mapBuilt    = useRef(false);

  // Rebuild time-map when segment or verses change (after DOM renders).
  useEffect(() => {
    mapBuilt.current = false; // signal RAF to rebuild on next tick
  }, [verses, segment]);

  // ── RAF loop ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isActive || !isFollowing) return;

    const tick = () => {
      const container = scrollContainerRef.current;
      const audio     = audioRef.current;

      if (container && audio && audio.duration > 0) {
        // Build/refresh time-map (once per segment change, not every frame)
        if (!mapBuilt.current) {
          timeMapRef.current = buildTimeMap(container, verses);
          mapBuilt.current   = true;
        }

        const map = timeMapRef.current;
        if (map.length === 0) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }

        // Segment window
        const segStart      = segment?.startTime    ?? 0;
        const segEnd        = segment?.endTime      ?? audio.duration;
        const scrollDelay   = segment?.scrollDelaySec ?? 0;
        const segDur        = Math.max(segEnd - segStart, 1);

        // Progress [0..1] within this segment
        const elapsed = Math.max(0, audio.currentTime - segStart);

        // Hold at top during the opening prayer/mantra (not in written text)
        if (elapsed < scrollDelay) {
          lastApplied.current = 0;
          container.scrollTop = 0;
          rafRef.current = requestAnimationFrame(tick);
          return;
        }

        // Map only the post-delay portion to the verses
        const scrollable = Math.max(elapsed - scrollDelay, 0);
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

        // How far within this verse [0..1]
        const span        = active.endRatio - active.startRatio;
        const withinVerse = span > 0
          ? Math.min((ratio - active.startRatio) / span, 1)
          : 0;

        // Interpolate offsetTop between active and next verse
        // offsetTop is stable (layout), safe to use in RAF
        const activeOffsetTop = active.offsetTop;
        const nextOffsetTop   = next ? next.offsetTop : activeOffsetTop;
        const interpOffsetTop = activeOffsetTop + (nextOffsetTop - activeOffsetTop) * withinVerse;

        // Place active verse at 28% from top (teleprompter sweet-spot)
        const sweetSpot = container.clientHeight * 0.28;
        const rawTarget = interpOffsetTop - sweetSpot;
        const maxScroll = container.scrollHeight - container.clientHeight;
        const target    = Math.max(0, Math.min(rawTarget, maxScroll));

        // Smooth lerp
        const current = container.scrollTop;
        const next_st = current + (target - current) * LERP;

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
