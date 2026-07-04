import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

/**
 * Shared easing curve for the whole site — a soft decelerate that reads as
 * "premium" rather than the linear/easeOut Framer default. Every scroll
 * reveal on the page should use this so the motion feels like one hand
 * designed it, not six different AI passes.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "transition"> {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
}

/** Fade + rise on scroll into view. The default reveal for section content. */
export const Reveal = ({ children, delay = 0, y = 28, duration = 0.8, once = true, className, ...props }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, margin: "-80px" }}
    transition={{ duration, delay, ease: EASE }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/** Text slides up from behind a mask — for headlines that want a bit more ceremony. */
export const RevealMask = ({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <span className="block overflow-hidden">
    <motion.span
      initial={{ y: "115%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className ? `block ${className}` : "block"}
    >
      {children}
    </motion.span>
  </span>
);

/** Stagger container — pair with StaggerItem for lists/grids that should cascade in. */
export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const StaggerGroup = ({
  children,
  className,
  stagger = 0.12,
  delayChildren = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={staggerContainer(stagger, delayChildren)}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div variants={staggerItemVariants} className={className}>
    {children}
  </motion.div>
);
