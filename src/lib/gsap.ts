import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Single registration point for GSAP. Importing from here guarantees the
 * plugins are registered exactly once, and that GSAP's ticker — not a second
 * rAF loop — drives Lenis, which is what keeps scrub animations from jittering
 * against smooth scroll.
 */
let registered = false;

if (!registered) {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  // Match the site's shared easing curve (cubic-bezier(.22,1,.36,1)).
  gsap.registerEase("lion", (p) => 1 - Math.pow(1 - p, 3));
  registered = true;
}

export const LION_EASE = "power3.out";

export { gsap, ScrollTrigger, SplitText };

/** True when the visitor asked for less motion — every effect must honour this. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
