import { useState, useEffect, useRef, useCallback } from 'react';

export interface AudioSegment {
  /** Absolute start time in seconds within the audio file (default: 0) */
  startTime?: number;
  /** Absolute end time in seconds within the audio file (default: full duration) */
  endTime?: number;
}

/**
 * Plays the provided audio file, optionally restricted to a [startTime, endTime]
 * window within the file. This lets multiple segments share one combined audio
 * file (e.g. Vishwambhari + Jay Adhyashakti in one mp3) while each segment
 * plays only its own slice and loops back to its own start.
 */
export function useAudioPlayer(audioUrl: string, segment?: AudioSegment) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1 within the segment window
  const [currentTime, setCurrentTime] = useState(0); // seconds from segment start
  const [duration, setDuration] = useState(0);       // segment duration in seconds

  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Store segment bounds in a ref so event handlers always see current values.
  const segmentRef = useRef(segment);
  segmentRef.current = segment;

  // Initialize the audio element once per URL.
  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.preload = 'auto';
    audioRef.current = audio;

    const getSegBounds = (fullDur: number) => {
      const start = segmentRef.current?.startTime ?? 0;
      const end = segmentRef.current?.endTime ?? fullDur;
      return { start, end, segDur: end - start };
    };

    const updateProgress = () => {
      const fullDur = audio.duration || 0;
      if (fullDur === 0) return;
      const { start, end, segDur } = getSegBounds(fullDur);

      // If audio drifted past the segment end, loop back to segment start.
      if (audio.currentTime >= end) {
        audio.currentTime = start;
        return;
      }

      const elapsed = audio.currentTime - start;
      setProgress(segDur > 0 ? elapsed / segDur : 0);
      setCurrentTime(elapsed);
      setDuration(segDur);
    };

    const handleMetadata = () => {
      const fullDur = audio.duration || 0;
      const { start, segDur } = getSegBounds(fullDur);
      // Jump to segment start when metadata loads.
      audio.currentTime = start;
      setDuration(segDur);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleMetadata);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleMetadata);
      audioRef.current = null;
    };
  }, [audioUrl]);

  // When segment bounds change (tab switch to different segment of same file),
  // seek to the new segment start immediately.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const start = segment?.startTime ?? 0;
    audio.currentTime = start;
    setProgress(0);
    setCurrentTime(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segment?.startTime, segment?.endTime]);

  // Sync play/pause.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch((e) => {
        console.error('Audio play failed:', e);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlayPause = useCallback(() => setIsPlaying((p) => !p), []);
  const toggleMute = useCallback(() => setIsMuted((p) => !p), []);

  const seek = useCallback((ratio: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const fullDur = audio.duration;
    const start = segmentRef.current?.startTime ?? 0;
    const end = segmentRef.current?.endTime ?? fullDur;
    const segDur = end - start;
    audio.currentTime = start + ratio * segDur;
    setProgress(ratio);
  }, []);

  return {
    isPlaying,
    togglePlayPause,
    progress,
    seek,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    currentTime,
    duration,
    audioRef,
  };
}
