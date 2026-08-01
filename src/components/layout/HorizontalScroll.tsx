import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

interface HorizontalScrollProps {
  children: ReactNode;
  /** Extra classes on the row that travels sideways */
  rowClassName?: string;
  /** Rendered under the sticky frame (progress rule, hints) */
  footer?: (progress: number) => ReactNode;
  /** Content shown above the row inside the sticky frame */
  header?: ReactNode;
}

/**
 * Pinned horizontal gallery. The outer track is as tall as the horizontal
 * distance the row needs to travel, so scroll maps 1:1 onto sideways motion —
 * no over- or under-scroll. Disabled entirely on touch devices and for
 * reduced-motion users; those get the plain row back (the caller renders a
 * snap-scroll fallback instead).
 */
export const useHorizontalEligible = () => {
  const reduced = useReducedMotion();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 1023px)").matches;
    setOk(!coarse && !narrow && !reduced);
  }, [reduced]);

  return ok;
};

const HorizontalScroll = ({ children, rowClassName = "", footer, header }: HorizontalScrollProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const row = rowRef.current;
      if (!row) return;
      setDistance(Math.max(0, row.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (rowRef.current) ro.observe(rowRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);

  useMotionValueEvent(smooth, "change", (v) => setProgress(Math.min(1, Math.max(0, v))));

  return (
    <div ref={trackRef} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-20 pb-8">
        {header}
        <motion.div ref={rowRef} style={{ x }} className={`flex will-change-transform ${rowClassName}`}>
          {children}
        </motion.div>
        {footer?.(progress)}
      </div>
    </div>
  );
};

export default HorizontalScroll;
