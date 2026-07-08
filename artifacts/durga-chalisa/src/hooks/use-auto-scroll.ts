import { useState, useEffect, useRef, useCallback } from 'react';

export function useAutoScroll(scrollContainerRef: React.RefObject<HTMLElement | null>) {
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [speed, setSpeed] = useState(1); // multiplier
  const [direction, setDirection] = useState<1 | -1>(1);

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const animateScroll = useCallback((time: number) => {
    if (!scrollContainerRef.current) return;
    
    if (lastTimeRef.current != null) {
      const delta = time - lastTimeRef.current;
      // Base speed: e.g. 30 pixels per second
      const basePixelsPerMs = 30 / 1000;
      const scrollAmount = delta * basePixelsPerMs * speed * direction;
      
      scrollContainerRef.current.scrollBy(0, scrollAmount);
    }
    
    lastTimeRef.current = time;
    if (isAutoScrolling) {
      requestRef.current = requestAnimationFrame(animateScroll);
    }
  }, [speed, direction, isAutoScrolling, scrollContainerRef]);

  useEffect(() => {
    if (isAutoScrolling) {
      lastTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(animateScroll);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      lastTimeRef.current = null;
    }
    
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isAutoScrolling, animateScroll]);

  const toggleAutoScroll = useCallback(() => setIsAutoScrolling(p => !p), []);
  const toggleDirection = useCallback(() => setDirection(d => (d === 1 ? -1 : 1) as 1 | -1), []);

  return {
    isAutoScrolling,
    toggleAutoScroll,
    speed,
    setSpeed,
    direction,
    toggleDirection
  };
}
