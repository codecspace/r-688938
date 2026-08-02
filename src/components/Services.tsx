import { motion, useReducedMotion } from "framer-motion";
import { Building2, Compass, LineChart, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/layout/Reveal";
import { SplitHeading, EASE } from "@/components/layout/Editorial";

const services = [
  {
    n: "01",
    icon: Compass,
    title: "Property advisory",
    body: "A shortlist built around how you actually live or trade — not around what a developer needs to move this quarter.",
  },
  {
    n: "02",
    icon: Building2,
    title: "Commercial leasing",
    body: "High-street retail, offices and mixed-use across Gurugram and Noida, with footfall and yield modelled before you commit.",
  },
  {
    n: "03",
    icon: LineChart,
    title: "Investment strategy",
    body: "Entry pricing, absorption, exit horizon. Every recommendation is backed by market data you get to see.",
  },
  {
    n: "04",
    icon: ShieldCheck,
    title: "Transaction management",
    body: "Diligence, paperwork, bank coordination and handover — handled end to end so nothing lands on you at the last minute.",
  },
];

/**
 * Beat four of the timeline. The camera cranes above the form here, so this
 * section stays deliberately open — glass cards floating over the render with
 * no solid veil behind them.
 */
const Services = () => {
  const reduced = useReducedMotion();

  return (
    <section id="services" className="relative py-28 md:py-40">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-16 md:mb-24">
          <Reveal className="lg:col-span-4">
            <span className="eyebrow">What we do</span>
          </Reveal>
          <SplitHeading
            text="Four ways we earn the introduction."
            className="lg:col-span-8 font-display text-display-md text-white max-w-[18ch]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 44, rotateX: reduced ? 0 : 6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ duration: 1, delay: i * 0.09, ease: EASE }}
              className="glass-lux group p-8 md:p-10"
              style={{ transformPerspective: 1200 }}
            >
              <div className="flex items-start justify-between gap-6 mb-8">
                <span className="index-num">{service.n}</span>
                <service.icon
                  className="w-6 h-6 text-lion-gold/80 transition-transform duration-700 group-hover:scale-110"
                  strokeWidth={1.1}
                />
              </div>

              <h3 className="font-display text-3xl md:text-4xl text-white leading-none mb-4 transition-colors duration-500 group-hover:text-lion-lightgold">
                {service.title}
              </h3>
              <p className="text-white/55 leading-relaxed max-w-md">{service.body}</p>

              <div className="mt-8 h-px w-full bg-white/10 overflow-hidden">
                <span className="block h-px w-full origin-left scale-x-0 bg-lion-gold transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
