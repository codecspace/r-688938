
import { Button } from "./ui/button";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import ParticleField from "@/components/layout/ParticleField";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Floating navbar state
  useEffect(() => {
    const navbar = document.querySelector(".site-navbar");

    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar?.classList.add("scrolled");
      } else {
        navbar?.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Hero exit, scrubbed with GSAP: the backdrop drifts and scales while the
   * copy lifts, blurs and fades — so the hero hands off to the next section
   * as one continuous move instead of two separate scroll events. GSAP is
   * imported dynamically so it stays out of the initial (LCP) bundle.
   */
  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    import("@/lib/gsap").then(({ gsap }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
        });

        tl.to("[data-hero-bg]", { yPercent: 18, scale: 1.12, ease: "none" }, 0)
          .to(
            "[data-hero-copy]",
            { yPercent: -22, opacity: 0, filter: "blur(8px)", ease: "none" },
            0
          )
          .to("[data-hero-scroll]", { opacity: 0, y: 20, ease: "none", duration: 0.3 }, 0);
      }, root);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden" id="home" ref={heroRef}>
      {/* Modern abstract background with pattern overlay */}
      <div
        data-hero-bg
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=70')",
        }}
      >
        {/* Modern overlay with pattern */}
        <div className="absolute inset-0 bg-lion-black/80"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0" 
          style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E')",
            backgroundSize: '150px 150px'
          }}
        ></div>
        
        {/* Modern blur element */}
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      </div>
      
      {/* Simplified minimal decoration */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-10">
        <motion.div 
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full border border-white/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Mouse-reactive particle field — subtle, sits above the image, behind the content card */}
      <ParticleField className="z-[1]" />
      
      <div className="relative z-10 container mx-auto px-8 text-left max-w-6xl">
          <motion.div
            data-hero-copy
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-xl lg:max-w-2xl backdrop-blur-lg bg-black/20 border border-white/10 p-8 rounded-xl"
          >
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl font-display text-white mb-6 leading-[0.95] tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            The Right Home for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lion-gold to-lion-lightgold"> Every Lifestyle</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 mb-8 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            From browsing listings to unlocking your dream home, your journey begins with us—where every search leads to a new beginning.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Button 
              variant="premium"
              size="lg"
              className="btn-3d btn-glow"
              onClick={() => scrollToSection('properties')}
            >
              <span className="relative z-10">Explore Properties</span>
            </Button>
            <Button 
              variant="glass" 
              className="btn-glow"
              size="lg"
              onClick={() => scrollToSection('contact')}
            >
              <span className="relative z-10">Contact Us</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        data-hero-scroll
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div 
          className="w-8 h-12 rounded-full border-2 border-white/30 flex items-center justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatType: "loop" 
          }}
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ 
              y: [0, 4, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "loop" 
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
