import { motion } from "framer-motion";
import { Compass, Flag } from "lucide-react";
import { Reveal, RevealMask, EASE } from "@/components/layout/Reveal";

interface Pillar {
  icon: typeof Compass;
  eyebrow: string;
  title: string;
  paragraphs: string[];
}

const pillars: Pillar[] = [
  {
    icon: Compass,
    eyebrow: "Where we're headed",
    title: "Our Vision",
    paragraphs: [
      "To be recognised as a leader in the real estate industry — known for an unwavering commitment to quality, transparency, and customer-first solutions. We aim to shape the future of real estate with investment opportunities and experiences that meet the ambitions of modern buyers and investors.",
      "We're expanding our presence across the major residential and commercial hubs of Delhi NCR, setting new benchmarks in luxury, stability, and investment security — building an ecosystem where every client finds the right asset, whether for living in or for growing wealth.",
    ],
  },
  {
    icon: Flag,
    eyebrow: "How we get there",
    title: "Our Mission",
    paragraphs: [
      "To redefine the real estate experience through exceptional service, strategic investment guidance, and genuine customer satisfaction — becoming a trusted partner for homebuyers, investors, and businesses across Delhi, Noida, and Gurugram.",
      "With a firm commitment to integrity, innovation, and market expertise, every transaction we handle is transparent, secure, and rewarding. Our role goes beyond selling property — it's equipping clients with practical guidance and data-led strategies for long-term financial growth.",
    ],
  },
];

const VisionMission = () => {
  return (
    <section className="relative bg-lion-obsidian py-28 md:py-36 overflow-hidden">
      {/* Ambient depth: one texture, one soft gold glow — not five competing colors */}
      <div className="grain absolute inset-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-lion-gold/[0.07] blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-20 md:mb-28">
          <Reveal>
            <span className="eyebrow justify-center mb-4">
              <span className="w-6 h-px bg-lion-gold" />
              Our Philosophy
              <span className="w-6 h-px bg-lion-gold" />
            </span>
          </Reveal>
          <SplitReveal
            as="h2"
            type="chars"
            className="font-display text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight"
          >
            Vision &amp; Mission
          </SplitReveal>
        </div>


        <div className="space-y-20 md:space-y-28">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const reversed = index % 2 === 1;
            return (
              <div
                key={pillar.title}
                className={`flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-12 items-start`}
              >
                <Reveal y={20} className="md:w-1/3 flex md:flex-col items-center md:items-start gap-4 md:gap-6 shrink-0">
                  <Icon strokeWidth={1} className="w-12 h-12 md:w-14 md:h-14 text-lion-gold/70 shrink-0" />
                  <div>
                    <span className="text-white/40 text-xs uppercase tracking-[0.25em]">{pillar.eyebrow}</span>
                    <h3 className="font-display text-3xl md:text-4xl text-white mt-2 leading-tight">{pillar.title}</h3>
                  </div>
                </Reveal>

                <div
                  className={`md:w-2/3 space-y-6 md:border-white/10 ${
                    reversed ? "md:border-r md:pr-12 md:text-right" : "md:border-l md:pl-12"
                  }`}
                >
                  {pillar.paragraphs.map((p, i) => (
                    <Reveal key={i} delay={0.1 + i * 0.12} y={16}>
                      <p className="text-white/70 text-lg leading-relaxed">{p}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <motion.div
          className="gold-rule mt-24 md:mt-28 origin-center"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE }}
        />
      </div>
    </section>
  );
};

export default VisionMission;
