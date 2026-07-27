import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Swords, Crown, Compass as CompassIcon } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem, EASE } from "@/components/layout/Reveal";
import SplitReveal from "@/components/layout/SplitReveal";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";

const traits = [
  { icon: Swords, label: "Strength and power", desc: "Performing our dominance and leadership in the real estate industry." },
  { icon: ShieldCheck, label: "Courage and belief", desc: "Empowering customers with bold, well-informed investment options." },
  { icon: Crown, label: "Authority and reputation", desc: "Establishing faith through reliability, expertise, and excellence." },
  { icon: CompassIcon, label: "Protection and reliability", desc: "Ensuring safe and transparent property transactions." },
];

const AboutUs = () => {
  // Slow inner parallax on the feature image, scrubbed against scroll.
  const containerRef = useGsap<HTMLElement>((_ctx, root) => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      "[data-about-img]",
      { yPercent: -7 },
      {
        yPercent: 7,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.5 },
      }
    );
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-24 md:py-32 relative overflow-hidden bg-lion-ivory">

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          <div>
            <Reveal>
              <span className="eyebrow mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                About Us
              </span>
            </Reveal>
            <SplitReveal
              as="h3"
              className="font-display text-4xl md:text-6xl text-lion-black mb-8 leading-[1.05] tracking-tight"
            >
              About Lionvest Realty
            </SplitReveal>


            <Reveal delay={0.1} className="space-y-5 text-lion-ink/75 text-lg leading-relaxed mb-10">
              <p>
                At Lionvest Realty Pvt. Ltd., we provide seamless, expert real estate
                guidance for residential and commercial buyers across Delhi, Noida, and
                Gurugram — simplifying property transactions with strategic advice and
                unmatched support at every step.
              </p>
              <p>
                Our name is more than a brand — <em className="text-lion-black not-italic font-medium">"Lionvest"</em> is
                a symbol of the strength, confidence, and reliability we bring to the
                real estate market:
              </p>
            </Reveal>

            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10" stagger={0.1}>
              {traits.map((item) => {
                const Icon = item.icon;
                return (
                  <StaggerItem key={item.label} className="border-l-2 border-lion-gold/40 pl-4 py-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="h-4 w-4 text-lion-gold" strokeWidth={1.5} />
                      <span className="font-semibold text-lion-black text-sm">{item.label}</span>
                    </div>
                    <p className="text-lion-stone text-sm leading-relaxed">{item.desc}</p>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>

            <Reveal delay={0.15}>
              <p className="text-lion-ink/75 text-lg leading-relaxed border-t border-lion-black/10 pt-6">
                With a client-first approach, we back every recommendation with deep
                market insight and unwavering integrity. Whether you're searching for
                your dream home or a strategic commercial investment, Lionvest Realty
                is your trusted partner in navigating Delhi NCR's real estate landscape.
              </p>
            </Reveal>
          </div>

          <motion.div
            className="relative h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl w-full">
              <img
                data-about-img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
                alt="Modern building facade"
                className="w-full h-[520px] md:h-[600px] object-cover scale-[1.14] will-change-transform"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-lion-black/80 via-lion-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="border-t border-lion-gold/40 pt-4">
                  <h4 className="text-xl font-display text-white mb-1">Luxury Real Estate</h4>
                  <p className="text-white/70 text-sm">Premium properties for discerning investors</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-5 bg-gradient-to-br from-lion-gold to-lion-darkgold w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-xl">
              <span className="text-lion-black text-2xl font-bold">12+</span>
              <span className="text-lion-black text-xs">Years</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
