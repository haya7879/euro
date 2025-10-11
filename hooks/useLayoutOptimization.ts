import { useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook to prevent forced reflows and optimize layout performance
 * Batches DOM reads and writes to minimize layout thrashing
 */
export function useLayoutOptimization() {
  const readQueue = useRef<Array<() => void>>([]);
  const writeQueue = useRef<Array<() => void>>([]);
  const rafIdRef = useRef<number | null>(null);

  const flush = useCallback(() => {
    // Execute all read operations first
    readQueue.current.forEach(fn => fn());
    readQueue.current = [];

    // Then execute all write operations
    writeQueue.current.forEach(fn => fn());
    writeQueue.current = [];

    rafIdRef.current = null;
  }, []);

  const scheduleFlush = useCallback(() => {
    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(flush);
    }
  }, [flush]);

  const read = useCallback((fn: () => void) => {
    readQueue.current.push(fn);
    scheduleFlush();
  }, [scheduleFlush]);

  const write = useCallback((fn: () => void) => {
    writeQueue.current.push(fn);
    scheduleFlush();
  }, [scheduleFlush]);

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return { read, write };
}

/**
 * Hook to prevent layout thrashing during scroll events
 */
export function useOptimizedScroll(callback: (scrollY: number) => void) {
  const rafIdRef = useRef<number | null>(null);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY !== lastScrollY.current) {
          callback(scrollY);
          lastScrollY.current = scrollY;
        }
        rafIdRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [callback]);
}

/**
 * Hook to batch resize events and prevent forced reflows
 */
export function useOptimizedResize(callback: (width: number, height: number) => void) {
  const rafIdRef = useRef<number | null>(null);
  const lastSize = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        if (width !== lastSize.current.width || height !== lastSize.current.height) {
          callback(width, height);
          lastSize.current = { width, height };
        }
        rafIdRef.current = null;
      });
    };

    // Initial call
    handleResize();

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [callback]);
}

/**
 * Hook to measure element dimensions without causing forced reflow
 */
export function useOptimizedMeasure<T extends HTMLElement>() {
  const elementRef = useRef<T | null>(null);
  const measureRef = useRef({ width: 0, height: 0 });
  const rafIdRef = useRef<number | null>(null);

  const measure = useCallback((callback: (dimensions: { width: number; height: number }) => void) => {
    if (!elementRef.current) return;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        measureRef.current = { width: rect.width, height: rect.height };
        callback(measureRef.current);
      }
      rafIdRef.current = null;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return { elementRef, measure, dimensions: measureRef.current };
}

/**
 * Hook to debounce expensive operations
 */
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  }, [delay]);
}

/**
 * Hook to throttle expensive operations
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const lastRun = useRef(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    const timeSinceLastRun = now - lastRun.current;

    if (timeSinceLastRun >= delay) {
      callbackRef.current(...args);
      lastRun.current = now;
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
        lastRun.current = Date.now();
      }, delay - timeSinceLastRun);
    }
  }, [delay]);
}

