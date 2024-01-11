import { RefObject, useEffect } from "react";

interface useIntersectionObserverProps {
  enabled: boolean;
  onIntersect: () => void;
  root?: RefObject<Element>;
  rootMargin?: string;
  target: RefObject<Element>;
  threshold?: number;
}

export default function useIntersectionObserver({
  enabled = true,
  onIntersect,
  root,
  rootMargin = "0px",
  target,
  threshold = 0.1,
}: useIntersectionObserverProps) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      },
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.current, enabled]);
}
