import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker rather than its own rAF loop.
 * Sharing a single loop is what keeps ScrollTrigger scrub animations locked to
 * the eased scroll position instead of lagging a frame behind it.
 */
const SmoothScroll = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Lazy sections mount after first paint — recalculate trigger positions.
    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 600);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
