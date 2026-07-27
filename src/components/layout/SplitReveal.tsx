import { ElementType, ReactNode, useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from "@/lib/gsap";

interface SplitRevealProps {
  children: ReactNode;
  /** Rendered element — headings should keep their semantic tag. */
  as?: ElementType;
  className?: string;
  delay?: number;
  /** "lines" reads calmer for headlines; "chars" is the showier agency cue. */
  type?: "lines" | "chars";
}

/**
 * Masked split reveal driven by GSAP SplitText + ScrollTrigger. Lines (or
 * chars) rise from behind a clip mask as the element enters the viewport.
 * Falls back to plain static text when reduced motion is requested or when the
 * font hasn't loaded yet, so text is never left invisible.
 */
const SplitReveal = ({
  children,
  as: Tag = "span",
  className,
  delay = 0,
  type = "lines",
}: SplitRevealProps) => {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let split: SplitText | null = null;
    let ctx: gsap.Context | null = null;
    let cancelled = false;

    const run = () => {
      if (cancelled || !el) return;
      ctx = gsap.context(() => {
        split = new SplitText(el, {
          type: type === "chars" ? "lines,chars" : "lines",
          linesClass: "split-line",
          mask: "lines",
        });

        const targets = type === "chars" ? split.chars : split.lines;

        gsap.from(targets, {
          yPercent: 115,
          opacity: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          stagger: type === "chars" ? 0.018 : 0.09,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      }, el);
    };

    // Wait for webfonts so line breaks are measured against the final metrics.
    if (document.fonts?.status === "loaded") run();
    else document.fonts?.ready.then(run).catch(run);

    return () => {
      cancelled = true;
      split?.revert();
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
};

export default SplitReveal;
