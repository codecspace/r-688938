import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

/**
 * Wraps the app in Lenis-driven smooth scrolling. This alone accounts for a
 * lot of the "expensive agency site" feel — scroll momentum with a gentle
 * ease instead of the browser's default stepped scroll. Framer Motion's
 * useScroll/whileInView keep working normally since Lenis animates the real
 * scroll position rather than replacing it.
 */
const SmoothScroll = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Touch devices already have momentum scrolling; running Lenis on top of
    // it burns a frame budget iOS Safari doesn't have and can freeze the page.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isTouch) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
