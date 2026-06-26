import { RefObject, useEffect } from 'react';
import { DESKTOP_QUERY } from '@/hooks/useMediaQuery';

export function useTopPaneHeight(
  topPaneRef: RefObject<HTMLDivElement>,
  setTopHeight: (h: number) => void,
  setMinTopHeight: (h: number) => void,
  deps: unknown[] = []
) {
  useEffect(() => {
    const measure = () => {
      if (!topPaneRef.current || !window.matchMedia(DESKTOP_QUERY).matches) return;
      const h = topPaneRef.current.scrollHeight;
      setTopHeight(h);
      setMinTopHeight(h);
    };
    const timer = setTimeout(measure, 150);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measure);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
