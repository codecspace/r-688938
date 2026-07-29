import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Display headline that reveals word-by-word from behind a mask.
 * The signature type entrance for the whole site — one move, reused.
 */
export const SplitHeading = ({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) => {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[Tag] as typeof motion.h2;

  if (reduced) return <Tag className={className}>{text}</Tag>;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.08em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              visible: { y: 0, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};

/**
 * Slow vertical drift for imagery as it passes through the viewport.
 * Disabled entirely for reduced-motion users.
 */
export const Parallax = ({
  children,
  distance = 60,
  className = "",
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={reduced ? undefined : { y }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
};

/** Image that un-mask-wipes upward into place. */
export const MediaReveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    className={className}
    initial={{ clipPath: "inset(0 0 100% 0)" }}
    whileInView={{ clipPath: "inset(0 0 0% 0)" }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 1.1, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);
