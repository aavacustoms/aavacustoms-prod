"use client";
import { useEffect, useRef } from "react";

/**
 * Attaches IntersectionObserver to a ref and adds "revealed" class
 * when the element enters the viewport.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          if (!options.repeat) observer.unobserve(el);
        } else if (options.repeat) {
          el.classList.remove("revealed");
        }
      },
      {
        threshold: options.threshold ?? 0.12,
        rootMargin: options.rootMargin ?? "0px 0px -40px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
