import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projectsData } from "@/data/projectsData";
import { Reveal } from "@/components/layout/Reveal";
import { SplitHeading, EASE } from "@/components/layout/Editorial";
import ImageWithFallback from "@/components/layout/ImageWithFallback";

/**
 * Beat two of the timeline: property panels that float over the live 3D scene.
 * Each panel drifts at its own rate as the section passes through the viewport,
 * so the grid reads as depth rather than as a flat card wall.
 */
const Panel = ({
  property,
  index,
}: {
  property: (typeof projectsData)[number];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Column-dependent drift — the middle column lags, the outer ones lead.
  const depth = [70, 130, 40][index % 3];
  const y = useTransform(scrollYProgress, [0, 1], [depth, -depth]);

  return (
    <motion.div ref={ref} style={reduced ? undefined : { y }} className="will-change-transform">
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.05, delay: (index % 3) * 0.1, ease: EASE }}
      >
        <Link to={`/project/${property.id}`} className="group block h-full">
          <div className="glass-lux overflow-hidden p-3">
            <div className="media-frame media-zoom h-[280px] md:h-[330px]">
              <ImageWithFallback
                src={property.heroImage || property.images?.[0] || property.image}
                alt={property.propertyName}
                fallbackLabel={property.propertyName}
                width={560}
                height={340}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lion-obsidian/80 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-40" />

              {(property.isNew || property.isFeatured) && (
                <div className="absolute top-4 left-4 flex gap-2 z-10">
                  {property.isNew && (
                    <span className="backdrop-blur-md bg-white/10 text-lion-lightgold text-[0.6rem] uppercase tracking-[0.22em] px-3 py-1.5 border border-white/15">
                      New
                    </span>
                  )}
                  {property.isFeatured && (
                    <span className="bg-lion-gold text-lion-black text-[0.6rem] uppercase tracking-[0.22em] px-3 py-1.5">
                      Featured
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="px-4 pt-6 pb-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-lion-gold text-[0.6rem] uppercase tracking-[0.28em]">
                    {property.developerName}
                  </span>
                  <h3 className="font-display text-2xl text-white mt-2 leading-tight">
                    {property.propertyName}
                  </h3>
                  <p className="text-white/40 text-xs uppercase tracking-[0.18em] mt-2">
                    {property.location}
                  </p>
                </div>
                <ArrowUpRight
                  className="w-5 h-5 text-white/35 shrink-0 mt-1 transition-all duration-500 group-hover:text-lion-gold group-hover:translate-x-1 group-hover:-translate-y-1"
                  strokeWidth={1.25}
                />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

const FeaturedProperties = () => {
  return (
    <section id="properties" className="relative py-24 md:py-40">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
          <div>
            <Reveal>
              <span className="eyebrow mb-6">Featured</span>
            </Reveal>
            <SplitHeading
              text="Addresses worth a second look."
              className="font-display text-display-md text-white max-w-[14ch]"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="text-white/45 text-sm max-w-xs leading-relaxed md:text-right">
              Currently open for enquiry across Gurugram, Noida and Delhi.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {projectsData.map((property, i) => (
            <Panel key={property.id} property={property} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
