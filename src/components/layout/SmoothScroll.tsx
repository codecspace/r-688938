import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cinematicScroll, isTouchDevice, prefersReducedMotion } from "@/lib/cinematicScroll";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives the whole cinematic timeline.
 *
 * - Lenis provides the momentum scroll on pointer-fine devices (touch devices
 *   already have native momentum; layering Lenis on top of it costs frames on
 *   iOS Safari and can lock the page).
 * - GSAP's ticker runs Lenis' rAF so ScrollTrigger and Lenis never disagree
 *   about the current scroll position.
 * - A single ScrollTrigger publishes 0..1 document progress into
 *   `cinematicScroll`, which the WebGL scene reads each frame.
 */
const SmoothScroll = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const reduced = prefersReducedMotion();
    const touch = isTouchDevice();
    let lenis: Lenis | null = null;
    let cleanupTicker: (() => void) | undefined;

    if (!reduced && !touch) {
      lenis = new Lenis({
        duration: 1.25,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        autoRaf: false,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      cleanupTicker = () => gsap.ticker.remove(raf);
    }

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        cinematicScroll.target = self.progress;
        cinematicScroll.velocity = self.getVelocity() / 3000;
      },
    });

    // Seed immediately so a reload part-way down the page composes correctly.
    cinematicScroll.target = trigger.progress;
    cinematicScroll.progress = cinematicScroll.target;

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      trigger.kill();
      cleanupTicker?.();
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
