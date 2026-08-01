import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projectsData } from "@/data/projectsData";
import { Reveal } from "@/components/layout/Reveal";
import { SplitHeading, MediaReveal, Parallax } from "@/components/layout/Editorial";
import ImageWithFallback from "@/components/layout/ImageWithFallback";

/** Editorial index of developer partnerships — alternating full-width plates. */
const Projects = () => {
  return (
    <section id="projects" className="bg-lion-paper py-24 md:py-36">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 mb-16 md:mb-24">
          <Reveal className="lg:col-span-4">
            <span className="eyebrow">Developer partners</span>
          </Reveal>
          <div className="lg:col-span-8">
            <SplitHeading
              text="Projects we know inside out."
              className="font-display text-display-md text-lion-black max-w-[16ch]"
            />
            <Reveal delay={0.1}>
              <p className="text-lion-stone text-base md:text-lg mt-6 max-w-xl leading-relaxed">
                A curated shortlist across Gurugram, Noida and Delhi — every address vetted for
                build quality, location, and long-term value.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="border-t border-black/12">
          {projectsData.map((project, index) => {
            const reversed = index % 2 === 1;
            return (
              <article
                key={project.id}
                className="group border-b border-black/12 py-12 md:py-16"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center`}>
                  <div className={`lg:col-span-7 ${reversed ? "lg:order-2" : ""}`}>
                    <MediaReveal>
                      <Link to={`/project/${project.id}`} className="block media-frame media-zoom h-[280px] md:h-[440px]">
                        <Parallax distance={26} className="h-full">
                          <ImageWithFallback
                            src={project.heroImage || project.images?.[0] || project.image}
                            alt={project.propertyName}
                            fallbackLabel={project.propertyName}
                            width={880}
                            height={440}
                            className="w-full h-[112%] object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        </Parallax>
                      </Link>
                    </MediaReveal>
                  </div>

                  <div className={`lg:col-span-5 ${reversed ? "lg:order-1" : ""}`}>
                    <Reveal delay={0.08}>
                      <div className="flex items-center gap-4 mb-5">
                        <span className="index-num">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="h-px w-8 bg-lion-gold/60" />
                        <span className="text-lion-gold text-[0.65rem] uppercase tracking-[0.28em]">
                          {project.developerName}
                        </span>
                      </div>

                      <h3 className="font-display text-3xl md:text-4xl text-lion-black leading-[1.05] mb-4">
                        {project.propertyName}
                      </h3>

                      <p className="text-lion-stone text-xs uppercase tracking-[0.2em] mb-6">
                        {project.location}
                      </p>

                      <p className="text-lion-ink/70 leading-relaxed mb-8">{project.description}</p>

                      <Link
                        to={`/project/${project.id}`}
                        className="link-rule text-[0.7rem] uppercase tracking-[0.25em] text-lion-black hover:text-lion-darkgold transition-colors"
                      >
                        View project
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </Link>
                    </Reveal>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <Reveal delay={0.1} className="max-w-3xl mx-auto text-center mt-20 md:mt-28">
          <p className="font-display text-2xl md:text-3xl text-lion-black/80 leading-snug italic">
            &ldquo;We bring you the best living and commercial spaces — places built on quality,
            location, and long-term value.&rdquo;
          </p>
          <span className="index-num block mt-6">Lionvest Realty</span>
        </Reveal>
      </div>
    </section>
  );
};

export default Projects;
