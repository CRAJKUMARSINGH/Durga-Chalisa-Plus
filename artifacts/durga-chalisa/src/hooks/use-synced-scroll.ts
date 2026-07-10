import { useState, useEffect, useRef, useCallback } from 'react';

// After a manual scroll, wait this long before auto-follow resumes.
const RESUME_DELAY_MS = 4000;

/**
 * Verse-aware teleprompter sync.
 *
 * Instead of mapping audio progress linearly to scrollHeight (which races
 * ahead on short lines and lags on long ones), we:
 *
 *  1. Divide the audio duration evenly across the N verse elements that are
 *     currently in the DOM (verse-0, verse-1, … verse-N-1).
 *  2. Each frame, find which verse index corresponds to the current playback
 *     time, measure that element's offsetTop, and smoothly scroll it into
 *     the upper third of the viewport — exactly the way a teleprompter works.
 *
 * The reader can scroll freely at any time; auto-follow pauses for
 * RESUME_DELAY_MS and then quietly picks up again from the correct verse.
 */
export function useSyncedScroll(
  scrollContainerRef: React.RefObject<HTMLElement | null>,
  audioRef: React.RefObject<HTMLAudioElement | null>,
  isActive: boolean
) {
  const [isFollowing, setIsFollowing] = useState(true);
  const requestRef = useRef<number | null>(null);
  const lastAppliedTop = useRef<number | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── RAF loop ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isActive || !isFollowing) return;

    const tick = () => {
      const container = scrollContainerRef.current;
      const audio = audioRef.current;

      if (container && audio && audio.duration > 0) {
        // Collect all verse elements currently rendered in this container.
        const verses = Array.from(
          container.querySelectorAll<HTMLElement>('[id^="verse-"]')
        );

        if (verses.length > 0) {
          // Only sync to chantable lines (doha + chaupai), not headers/labels.
          const chantVerses = verses.filter(
            (el) => !el.classList.contains('verse-header')
          );
          const pool = chantVerses.length > 0 ? chantVerses : verses;

          // Which verse should be "active" right now?
          const ratio = audio.currentTime / audio.duration;
          const rawIdx = ratio * pool.length;
          const idx = Math.min(Math.floor(rawIdx), pool.length - 1);
          const verse = pool[idx];

          // Use getBoundingClientRect so we always measure relative to
          // the viewport, then convert to an absolute scrollTop value.
          const containerRect = container.getBoundingClientRect();
          const verseRect = verse.getBoundingClientRect();

          // Distance from current scroll position to where we want verse
          // to sit (25% from top of the container = teleprompter sweet spot).
          const delta =
            verseRect.top - containerRect.top - container.clientHeight * 0.25;

          const targetTop = container.scrollTop + delta;
          const clamped = Math.max(
            0,
            Math.min(targetTop, container.scrollHeight - container.clientHeight)
          );

          lastAppliedTop.current = clamped;
          container.scrollTop = clamped;
        } else {
          // Fallback: plain linear scroll if no verse elements found yet.
          const maxScroll = container.scrollHeight - container.clientHeight;
          if (maxScroll > 0) {
            const target = (audio.currentTime / audio.duration) * maxScroll;
            lastAppliedTop.current = target;
            container.scrollTop = target;
          }
        }
      }

      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isActive, isFollowing, scrollContainerRef, audioRef]);

  // ── Manual-scroll detection ───────────────────────────────────────────────
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const last = lastAppliedTop.current;
      // Ignore scroll events our own RAF loop just produced.
      if (last != null && Math.abs(container.scrollTop - last) < 2) return;

      setIsFollowing(false);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      resumeTimer.current = setTimeout(() => {
        setIsFollowing(true);
      }, RESUME_DELAY_MS);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, [scrollContainerRef]);

  // ── Reset following on play/pause ─────────────────────────────────────────
  useEffect(() => {
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
    setIsFollowing(true);
  }, [isActive]);

  // ── Manual resync (button) ────────────────────────────────────────────────
  const resync = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setIsFollowing(true);
  }, []);

  return { isFollowing, resync };
}
