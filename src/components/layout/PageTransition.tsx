import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { EASE } from "@/components/layout/Reveal";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  /** Set false to skip the entrance animation (e.g. to protect a tuned LCP). */
  animateIn?: boolean;
}

/** Shared route-level fade/slide wrapper. Fully disabled for reduced-motion users. */
const PageTransition = ({ children, className, animateIn = true }: PageTransitionProps) => {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={animateIn ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
