import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Reveal } from "@/components/layout/Reveal";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 12, suffix: "+", label: "Years in Delhi NCR real estate" },
  { value: 3, suffix: "", label: "Cities — Delhi, Noida, Gurugram" },
  { value: 5, suffix: "+", label: "Premium developer partnerships" },
  { value: 100, suffix: "%", label: "Focus on informed decisions" },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(spanRef, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 32, stiffness: 55 });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (spanRef.current) {
          spanRef.current.textContent = Math.floor(latest).toString() + suffix;
        }
      }),
    [springValue, suffix]
  );

  return <span ref={spanRef}>0{suffix}</span>;
};

/**
 * Thin, dark stat band bridging Vision/Mission and Projects. Numbers here
 * are all traceable to content already elsewhere on the site (12+ years,
 * 3 cities, 5 developer projects) rather than invented — swap in real
 * figures (transactions closed, sq. ft. under management, etc.) once you
 * have them, Arjun.
 */
const Stats = () => {
  return (
    <section className="relative bg-lion-obsidian py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} className="text-center md:border-l md:border-white/10 md:first:border-l-0 md:px-6">
              <div className="font-display text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white to-lion-gold mb-2 tabular-nums">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/50 text-xs md:text-sm uppercase tracking-wider leading-relaxed">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      <motion.div
        className="gold-rule absolute bottom-0 left-0 right-0 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </section>
  );
};

export default Stats;
