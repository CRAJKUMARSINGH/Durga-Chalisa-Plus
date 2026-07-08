import { useState, useEffect, useRef, useCallback } from 'react';
import audioUrl from '@assets/generated_audio/durga_chalisa_original.mp3';

/**
 * Plays the ~20-minute Durga Chalisa aarti recording as a single continuous
 * track, looping seamlessly back to the start when it ends.
 */
export function useAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize the audio element once.
  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.preload = 'auto';
    audio.loop = true;
    audioRef.current = audio;

    const updateProgress = () => {
      const duration = audio.duration || 0;
      if (duration > 0) {
        setProgress(audio.currentTime / duration);
      }
    };

    const handleEnded = () => {
      // audio.loop already restarts playback natively; just reset UI progress.
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateProgress);
      audio.removeEventListener('ended', handleEnded);
      audioRef.current = null;
    };
  }, []);

  // Sync play/pause state to the audio element.
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
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((p) => !p);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((p) => !p);
  }, []);

  const seek = useCallback((ratio: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const duration = audio.duration || 0;
    if (duration === 0) return;
    audio.currentTime = duration * ratio;
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
    // Exposed so the teleprompter can read live currentTime/duration each
    // animation frame without subscribing to React state (which only
    // updates a few times a second via `timeupdate`).
    audioRef,
  };
}
