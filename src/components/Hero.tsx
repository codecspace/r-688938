import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { SplitHeading, EASE } from "@/components/layout/Editorial";

const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
};

/**
 * Opening frame of the film. No photography — the WebGL scene behind the page
 * is the image. Type sits on it like a title card and dissolves as the camera
 * begins its move.
 */
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.6], ["blur(0px)", "blur(6px)"]);

  return (
    <header
      ref={heroRef}
      id="main-content"
      tabIndex={-1}
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden focus:outline-none"
    >
      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity, filter: blur }}
        className="relative z-10 container mx-auto px-6 md:px-8 max-w-7xl pb-16 md:pb-24 pt-40"
      >
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="eyebrow text-lion-lightgold mb-8"
        >
          Delhi &middot; Noida &middot; Gurugram
        </motion.span>

        <h1 className="font-display text-white text-display-lg max-w-[16ch] mt-6 [text-shadow:0_2px_40px_rgba(0,0,0,0.6)]">
          <SplitHeading as="p" text="The right home for" delay={0.3} />
          <SplitHeading
            as="p"
            text="every ambition"
            delay={0.5}
            className="italic text-lion-lightgold"
          />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: EASE }}
          className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end border-t border-white/12 pt-8"
        >
          <p className="md:col-span-5 text-white/60 text-base md:text-lg leading-relaxed max-w-md">
            A boutique advisory for residential and commercial property across Delhi NCR —
            from the first viewing to the day the keys change hands.
          </p>

          <div className="md:col-span-4 md:col-start-9 flex flex-wrap gap-4 md:justify-end">
            <button onClick={() => scrollToSection("properties")} className="btn-editorial btn-gold">
              <span>Explore Properties</span>
            </button>
            <button onClick={() => scrollToSection("contact")} className="btn-editorial btn-outline-light">
              <span>Speak to us</span>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue — doubles as the "this page is a timeline" hint */}
      <motion.button
        onClick={() => scrollToSection("properties")}
        aria-label="Scroll to properties section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
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
