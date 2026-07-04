import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, MouseEvent } from "react";

/**
 * Wraps a button/link so it "leans" toward the cursor within a small range —
 * a small, tasteful version of the magnetic-button trick used on most
 * agency-style sites. Strength is intentionally subtle; this should read as
 * polish, not a gimmick.
 */
const Magnetic = ({ children, strength = 18, className }: { children: ReactNode; strength?: number; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 12, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 150, damping: 12, mass: 0.3 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / rect.width) * strength);
    y.set((relY / rect.height) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
