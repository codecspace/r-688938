import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { projectsData } from "@/data/projectsData";
import { Reveal, RevealMask, EASE } from "@/components/layout/Reveal";
import ImageWithFallback from "@/components/layout/ImageWithFallback";
import TiltCard from "@/components/layout/TiltCard";

const Projects = () => {
  return (
    <section id="projects" className="py-24 md:py-32 bg-lion-ivory">
      <div className="container mx-auto px-4 max-w-6xl">
        <Reveal className="text-center mb-20">
          <span className="eyebrow justify-center mb-3">Developer Partners</span>
          <h3 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tight text-lion-black leading-[1.05]">
            <RevealMask>Our Projects</RevealMask>
          </h3>
          <motion.div
            className="w-16 h-px bg-lion-gold mx-auto mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </Reveal>

        <div className="space-y-20 md:space-y-28">
          {projectsData.map((project, index) => {
            const reversed = index % 2 === 1;
            return (
              <div
                key={project.id}
                className={`flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-14 group`}
              >
                <Reveal y={0} className="w-full md:w-1/2">
                  <TiltCard className="overflow-hidden rounded-lg shadow-xl shadow-black/10">
                    {/* Clip-path wipe reveal instead of a plain fade — an "editorial" image treatment */}
                    <motion.div
                      initial={{ clipPath: "inset(0 0 100% 0)" }}
                      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1, ease: EASE }}
                    >
                      <ImageWithFallback
                        src={project.heroImage || project.images?.[0] || project.image}
                        alt={project.propertyName}
                        fallbackLabel={project.propertyName}
                        optimizeWidth={720}
                        width={720}
                        height={380}
                        className="w-full h-[280px] md:h-[380px] object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </motion.div>
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none rounded-lg" />
                  </TiltCard>
                </Reveal>

                <Reveal delay={0.1} className="w-full md:w-1/2">
                  <div className="flex items-center gap-3 mb-2">
                    {project.image && (
                      <div className="w-9 h-9 rounded-md bg-white border border-black/5 shadow-sm flex items-center justify-center overflow-hidden shrink-0 p-1">
                        <ImageWithFallback
                          src={project.image}
                          alt={`${project.developerName} logo`}
                          optimizeWidth={72}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <span className="text-lion-gold text-xs uppercase tracking-[0.25em] font-medium">
                      {project.developerName}
                    </span>
                  </div>
                  <h4 className="font-display text-2xl md:text-3xl font-semibold mt-2 mb-3 text-lion-black">
                    {project.propertyName}
                  </h4>
                  <p className="flex items-center gap-1.5 text-lion-stone text-sm mb-4">
                    <MapPin className="w-3.5 h-3.5 text-lion-gold" />
                    {project.location}
                  </p>
                  <p className="text-lion-ink/70 leading-relaxed mb-6">{project.description}</p>
                  <Link
                    to={`/project/${project.id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-lion-black border-b border-lion-gold pb-1 transition-colors hover:text-lion-darkgold group/link"
                  >
                    View Details
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </Reveal>
              </div>
            );
          })}
        </div>

        <Reveal delay={0.1} className="text-center mt-24 max-w-3xl mx-auto">
          <p className="text-lion-ink/60 italic font-light text-lg leading-relaxed">
            "At Lionvest Realty, we bring you the best living and commercial spaces —
            places built on quality, location, and long-term value. Let us help you
            find the property that matches your ambitions."
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default Projects;
