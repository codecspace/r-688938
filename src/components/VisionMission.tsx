import { motion } from "framer-motion";
import { Reveal } from "@/components/layout/Reveal";
import { SplitHeading } from "@/components/layout/Editorial";

interface Pillar {
  n: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
}

const pillars: Pillar[] = [
  {
    n: "01",
    eyebrow: "Where we're headed",
    title: "Vision",
    paragraphs: [
      "To be recognised as a leader in the real estate industry — known for an unwavering commitment to quality, transparency, and customer-first solutions, shaping investment opportunities that meet the ambitions of modern buyers.",
      "We're expanding across the major residential and commercial hubs of Delhi NCR, setting benchmarks in luxury, stability, and investment security.",
    ],
  },
  {
    n: "02",
    eyebrow: "How we get there",
    title: "Mission",
    paragraphs: [
      "To redefine the real estate experience through exceptional service, strategic investment guidance, and genuine customer satisfaction across Delhi, Noida, and Gurugram.",
      "Every transaction we handle is transparent, secure, and rewarding. Our role goes beyond selling property — it's equipping clients with data-led strategies for long-term growth.",
    ],
  },
];

/** Full-bleed noir chapter. Oversized serif, hairline dividers, zero cards. */
const VisionMission = () => {
  return (
    <section className="relative bg-lion-obsidian py-28 md:py-40 overflow-hidden">
      <div className="grain absolute inset-0" />

      <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-20 md:mb-28">
          <Reveal className="lg:col-span-4">
            <span className="eyebrow">Our philosophy</span>
          </Reveal>
          <SplitHeading
            text="We measure success in decisions clients don't regret."
            className="lg:col-span-8 font-display text-display-md text-white max-w-[20ch]"
          />
        </div>

        <div className="border-t border-white/12">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 border-b border-white/12 py-14 md:py-20 group"
            >
              <Reveal y={18} className="lg:col-span-4 flex items-start gap-5">
                <span className="index-num text-white/35 pt-3">{pillar.n}</span>
                <div>
                  <span className="text-white/40 text-[0.65rem] uppercase tracking-[0.3em]">{pillar.eyebrow}</span>
                  <h3 className="font-display text-4xl md:text-5xl text-white mt-3 leading-none transition-colors duration-500 group-hover:text-lion-lightgold">
                    {pillar.title}
                  </h3>
                </div>
              </Reveal>

              <div className="lg:col-span-8 space-y-6 max-w-3xl">
                {pillar.paragraphs.map((p, i) => (
                  <Reveal key={i} delay={0.08 + i * 0.1} y={14}>
                    <p className={`leading-relaxed ${i === 0 ? "text-white/80 text-xl md:text-2xl font-light" : "text-white/55 text-base md:text-lg"}`}>
                      {p}
                    </p>
                  </Reveal>
                ))}
                <motion.div
                  className="h-px bg-lion-gold/60 origin-left mt-8 w-24"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
