import { useRef, useState, MouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useTransform, useSpring, MotionValue } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

/**
 * Wraps a card so it tilts in 3D toward the cursor and shows a soft gold
 * glow that tracks the pointer — the "premium interactive card" feel used
 * on Projects. Tilt is intentionally modest (default 8deg) since this sits
 * on a real estate site, not a game UI; subtle reads as premium, extreme
 * reads as gimmicky. No-ops gracefully on touch (no mousemove events fire).
 */
const TiltCard = ({ children, className, maxTilt = 8 }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { stiffness: 200, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [0, 1], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxTilt, maxTilt]), springConfig);
  const scale = useSpring(hovering ? 1.02 : 1, springConfig);

  const glowBackground = useTransform([x, y] as [MotionValue<number>, MotionValue<number>], (latest) => {
    const [gx, gy] = latest as number[];
    return `radial-gradient(circle at ${gx * 100}% ${gy * 100}%, rgba(212,175,55,0.3), transparent 55%)`;
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, scale, transformPerspective: 900 }}
      className={`relative ${className ?? ""}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
        style={{ background: glowBackground }}
        animate={{ opacity: hovering ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.div>
  );
};

export default TiltCard;
