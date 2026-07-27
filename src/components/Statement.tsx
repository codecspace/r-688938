import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";

const WORDS = [
  { text: "STRENGTH", filled: true },
  { text: "VISION", filled: false },
  { text: "TRUST", filled: true },
  { text: "GROWTH", filled: false },
];

/**
 * Full-viewport pinned section: the page "stops" while a huge line of type
 * scrubs horizontally, driven directly by scroll position via GSAP
 * ScrollTrigger. Each word also lifts and brightens as it crosses the centre
 * of the screen, which is what makes the moment feel authored rather than a
 * plain translate.
 */
const Statement = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scope = useGsap<HTMLElement>((_ctx, root) => {
    if (prefersReducedMotion()) return;

    const track = trackRef.current;
    if (!track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      tl.fromTo(track, { xPercent: 4 }, { xPercent: -58, ease: "none" });

      // Per-word emphasis as each crosses the viewport centre.
      gsap.utils.toArray<HTMLElement>("[data-word]", root).forEach((word) => {
        gsap.fromTo(
          word,
          { opacity: 0.35, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: word,
              containerAnimation: tl,
              start: "left 85%",
              end: "right 15%",
              scrub: true,
            },
          }
        );
      });

      gsap.fromTo(
        "[data-rule]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "top -20%", scrub: true },
        }
      );
    });

    // Mobile: no pin fight with touch scroll — a simple horizontal drift.
    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        track,
        { xPercent: 0 },
        {
          xPercent: -50,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.6 },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={scope} className="relative h-[240vh] bg-lion-obsidian">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="grain absolute inset-0" />

        <span className="eyebrow absolute top-10 md:top-14 left-1/2 -translate-x-1/2 justify-center whitespace-nowrap">
          The Lionvest Standard
        </span>

        <div ref={trackRef} className="whitespace-nowrap flex items-center gap-16 md:gap-24 will-change-transform">
          {[...WORDS, ...WORDS].map((w, i) => (
            <h2
              key={i}
              data-word
              className={`font-display text-[16vw] leading-none tracking-tight select-none ${
                w.filled
                  ? "text-transparent bg-clip-text bg-gradient-to-b from-lion-lightgold to-lion-darkgold"
                  : "text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.5)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.5)]"
              }`}
            >
              {w.text}
            </h2>
          ))}
        </div>

        <div data-rule className="gold-rule absolute bottom-10 md:bottom-14 w-40 origin-center" />
      </div>
    </section>
  );
};

export default Statement;
