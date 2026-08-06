import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { Reveal } from "@/components/layout/Reveal";
import { useSiteContent } from "@/context/SiteContentContext";


const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(spanRef, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 34, stiffness: 55 });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (spanRef.current) spanRef.current.textContent = Math.floor(latest).toString() + suffix;
      }),
    [springValue, suffix]
  );

  return <span ref={spanRef}>0{suffix}</span>;
};

/** Numeric register closing the noir chapter — oversized serif figures on hairlines. */
const Stats = () => {
  return (
    <section className="relative bg-lion-obsidian pb-24 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="bg-lion-obsidian px-5 py-10 md:px-8 md:py-14"
            >
              <div className="font-display text-5xl md:text-7xl text-white mb-4 tabular-nums leading-none">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/40 text-[0.68rem] md:text-xs uppercase tracking-[0.2em] leading-relaxed">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
