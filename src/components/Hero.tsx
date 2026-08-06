import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { SplitHeading, EASE } from "@/components/layout/Editorial";
import { useSiteContent } from "@/context/SiteContentContext";



const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
};

/**
 * Cinematic editorial opener: full-bleed ink-washed photography, an oversized
 * serif headline that reveals word by word, and a hairline meta rail at the
 * base instead of a card. One idea, executed cleanly.
 */
const Hero = () => {
  const { content } = useSiteContent();
  const hero = content.hero;
  const heroRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });


  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.18]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <header
      ref={heroRef}
      id="main-content"
      tabIndex={-1}
      className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-end overflow-hidden bg-lion-obsidian focus:outline-none"
    >
      {/* Full-bleed imagery */}
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { scale: imageScale, y: imageY }}
      >
        <img
          src={hero.image || "/hero-villa.webp"}
          alt="Contemporary luxury villa with landscaped frontage, representative of Lionvest Realty's Delhi NCR portfolio"
          width={1600}
          height={1067}
          {...({ fetchpriority: "high" } as Record<string, string>)}
          decoding="async"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-lion-obsidian via-lion-obsidian/70 to-lion-obsidian/40" />
        <div className="absolute inset-0 bg-lion-obsidian/25" />
      </motion.div>

      <div className="grain absolute inset-0 z-[1]" />

      {/* Content */}
      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 container mx-auto px-6 md:px-8 max-w-7xl pb-16 md:pb-24 pt-40"
      >
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          className="eyebrow text-lion-lightgold mb-8"
        >
          {hero.eyebrow}
        </motion.span>

        <h1 className="font-display text-white text-display-lg max-w-[16ch] mt-6">
          <SplitHeading as="p" text={hero.headlineLine1} delay={0.25} />
          <SplitHeading
            as="p"
            text={hero.headlineLine2}
            delay={0.45}
            className="italic text-lion-lightgold"
          />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
          className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end border-t border-white/15 pt-8"
        >
          <p className="md:col-span-5 text-white/65 text-base md:text-lg leading-relaxed max-w-md">
            {hero.intro}
          </p>

          <div className="md:col-span-4 md:col-start-9 flex flex-wrap gap-4 md:justify-end">
            <button onClick={() => scrollToSection("properties")} className="btn-editorial btn-gold">
              <span>{hero.primaryCta}</span>
            </button>
            <button onClick={() => scrollToSection("contact")} className="btn-editorial btn-outline-light">
              <span>{hero.secondaryCta}</span>
            </button>
          </div>
        </motion.div>
      </motion.div>


      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollToSection("about")}
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute right-6 md:right-10 bottom-16 md:bottom-24 z-10 hidden sm:flex flex-col items-center gap-3 text-white/45 hover:text-lion-gold transition-colors"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="w-4 h-4" strokeWidth={1.25} />
        </motion.span>
      </motion.button>
    </header>
  );
};

export default Hero;
