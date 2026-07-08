import { useState, useEffect, useRef, useCallback } from 'react';

// How long to leave the teleprompter alone after the reader manually
// scrolls, before it resumes following the chant automatically.
const RESUME_DELAY_MS = 4000;

/**
 * Drives the teleprompter's scroll position directly from the audio's
 * current playback position (currentTime / duration), so the text always
 * matches the chant's actual (fixed, unmodified) speed, with no independent
 * timer that can drift out of sync.
 *
 * The reader can freely scroll up or down at any time (wheel, touch, drag).
 * A manual scroll pauses auto-follow for a few seconds so it doesn't fight
 * the reader's input, then quietly resumes -- or the reader can tap "resync"
 * to jump back immediately.
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

  // RAF loop: while active and following, keep scrollTop matched to the
  // audio's live progress ratio every frame for buttery-smooth motion.
  useEffect(() => {
    if (!isActive || !isFollowing) return;

    const tick = () => {
      const container = scrollContainerRef.current;
      const audio = audioRef.current;
      if (container && audio && audio.duration > 0) {
        const maxScroll = container.scrollHeight - container.clientHeight;
        if (maxScroll > 0) {
          const ratio = audio.currentTime / audio.duration;
          const target = ratio * maxScroll;
          lastAppliedTop.current = target;
          container.scrollTop = target;
        }
      }
      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isActive, isFollowing, scrollContainerRef, audioRef]);

  // Detect reader-initiated scrolling (wheel, touch, keyboard, drag) and
  // pause auto-follow so it never fights the reader's own input.
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const last = lastAppliedTop.current;
      // Ignore the scroll event our own RAF loop just produced.
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

  // Every time playback starts (or stops), guarantee a clean, deterministic
  // follow state: cancel any pending resume timer and re-enable following so
  // pausing mid-way through the 4s "manual scroll" window can never strand
  // isFollowing at false the next time the reader presses play.
  useEffect(() => {
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
    setIsFollowing(true);
  }, [isActive]);

  const resync = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setIsFollowing(true);
  }, []);

  return { isFollowing, resync };
}
