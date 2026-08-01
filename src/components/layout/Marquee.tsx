import { useEffect, useRef } from "react";
import { useScroll, useVelocity } from "framer-motion";

interface MarqueeProps {
  items: string[];
  className?: string;
  reverse?: boolean;
  textClassName?: string;
}

/**
 * Infinite scrolling ticker band. Base speed is constant, but scroll velocity
 * nudges it faster (clamped) so the band reacts to movement instead of feeling
 * like a detached loop. Reduced-motion users keep the CSS-disabled version.
 */
const Marquee = ({ items, className = "", reverse = false, textClassName = "" }: MarqueeProps) => {
  const content = [...items, ...items];
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let current = 1;

    const tick = () => {
      const v = Math.abs(velocity.get());
      // 0 → 1x, 3000px/s → 2.6x, clamped so it never looks frantic.
      const target = 1 + Math.min(v / 3000, 1) * 1.6;
      current += (target - current) * 0.08;
      el.style.animationDuration = `${40 / current}s`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [velocity]);

  return (
    <div className={`marquee-row overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className="marquee-track"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {content.map((item, i) => (
          <span
            key={i}
            className={`flex items-center shrink-0 px-6 whitespace-nowrap text-sm md:text-base uppercase tracking-[0.3em] font-medium ${textClassName}`}
          >
            {item}
            <span className="ml-6 text-lion-gold text-xs">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
