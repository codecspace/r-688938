import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const SIZE = 52;
const RADIUS = (SIZE - 3) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Restrained scroll-to-top: an obsidian disc with a gold hairline progress
 * ring. No glow, no shine sweep — the ring itself is the feedback.
 */
const ScrollToTop = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => setVisible(v > 0.12));
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: SIZE, height: SIZE }}
          className="group fixed bottom-8 right-8 z-50 rounded-full bg-lion-obsidian/90 backdrop-blur-md border border-white/10 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lion-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          <svg
            className="absolute inset-0 -rotate-90"
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            aria-hidden="true"
          >
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
            />
            <motion.circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="hsl(var(--lion-gold, 43 62% 52%))"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              style={{ pathLength: progress }}
              className="text-lion-gold"
            />
          </svg>

          <ArrowUp
            className="relative z-10 h-4 w-4 text-white/70 group-hover:text-lion-lightgold transition-colors duration-300"
            strokeWidth={1.5}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
