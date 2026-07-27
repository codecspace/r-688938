import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const WORDS = [
  { text: "STRENGTH", filled: true },
  { text: "VISION", filled: false },
  { text: "TRUST", filled: true },
  { text: "GROWTH", filled: false },
];

/**
 * Full-viewport pinned section: the page appears to "stop" while a huge
 * line of type scrubs horizontally, driven directly by scroll position
 * (not a timer). This is the single biggest lever for the "insane, not
 * just subtle" feeling — one oversized, confident moment instead of many
 * small polite ones. The four words are the same brand traits used quietly
 * in the About section — here they get to be loud.
 */
const Statement = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-58%"]);
  const lineScale = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section ref={ref} className="relative h-[240vh] bg-lion-obsidian">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="grain absolute inset-0" />

        <span className="eyebrow absolute top-10 md:top-14 left-1/2 -translate-x-1/2 justify-center whitespace-nowrap">
          The Lionvest Standard
        </span>

        <motion.div style={{ x }} className="whitespace-nowrap flex items-center gap-16 md:gap-24 will-change-transform">
          {[...WORDS, ...WORDS].map((w, i) => (
            <h2
              key={i}
              className={`font-display text-[16vw] leading-none tracking-tight select-none ${
                w.filled
                  ? "text-transparent bg-clip-text bg-gradient-to-b from-lion-lightgold to-lion-darkgold"
                  : "text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.5)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.5)]"
              }`}
            >
              {w.text}
            </h2>
          ))}
        </motion.div>

        <motion.div
          style={{ scaleX: lineScale }}
          className="gold-rule absolute bottom-10 md:bottom-14 w-40 origin-center"
        />
      </div>
    </section>
  );
};

export default Statement;
