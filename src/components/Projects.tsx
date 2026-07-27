import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { projectsData } from "@/data/projectsData";
import ImageWithFallback from "@/components/layout/ImageWithFallback";
import SplitReveal from "@/components/layout/SplitReveal";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";

const Projects = () => {
  /**
   * GSAP handles two things here: an entrance for each row (image wipes open
   * while the copy rises), and a continuous inner parallax on the image so it
   * drifts slower than its frame — the depth cue used on most agency sites.
   */
  const scope = useGsap<HTMLElement>((_ctx, root) => {
    if (prefersReducedMotion()) return;

    gsap.utils.toArray<HTMLElement>("[data-row]", root).forEach((row) => {
      const frame = row.querySelector("[data-frame]");
      const img = row.querySelector("[data-img]");
      const copy = row.querySelectorAll("[data-copy] > *");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: row, start: "top 80%", once: true },
      });

      if (frame) {
        tl.fromTo(
          frame,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "power3.out" },
          0
        );
      }

      tl.from(copy, { y: 28, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" }, 0.15);

      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: 0.5 },
          }
        );
      }
    });

    gsap.fromTo(
      "[data-rule]",
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-rule]", start: "top 92%", once: true },
      }
    );
  }, []);

  return (
    <section ref={scope} id="projects" className="py-24 md:py-32 bg-lion-ivory">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20">
          <span className="eyebrow justify-center mb-3">Developer Partners</span>
          <SplitReveal
            as="h3"
            className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tight text-lion-black leading-[1.05]"
          >
            Our Projects
          </SplitReveal>
          <div data-rule className="w-16 h-px bg-lion-gold mx-auto mt-6 origin-center" />
        </div>

        <div className="space-y-20 md:space-y-28">
          {projectsData.map((project, index) => {
            const reversed = index % 2 === 1;
            return (
              <div
                key={project.id}
                data-row
                className={`flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-14 group`}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative overflow-hidden rounded-lg shadow-xl shadow-black/10">
                    <div data-frame className="overflow-hidden">
                      <ImageWithFallback
                        data-img
                        src={project.heroImage || project.images?.[0] || project.image}
                        alt={project.propertyName}
                        fallbackLabel={project.propertyName}
                        className="w-full h-[280px] md:h-[380px] object-cover scale-[1.16] will-change-transform"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none rounded-lg" />
                  </div>
                </div>

                <div data-copy className="w-full md:w-1/2">
                  <div className="flex items-center gap-3 mb-2">
                    {project.image && (
                      <div className="w-9 h-9 rounded-md bg-white border border-black/5 shadow-sm flex items-center justify-center overflow-hidden shrink-0 p-1">
                        <ImageWithFallback
                          src={project.image}
                          alt={`${project.developerName} logo`}
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
                  <div>
                    <Link
                      to={`/project/${project.id}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-lion-black border-b border-lion-gold pb-1 transition-colors hover:text-lion-darkgold group/link"
                    >
                      View Details
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-24 max-w-3xl mx-auto">
          <p className="text-lion-ink/60 italic font-light text-lg leading-relaxed">
            "At Lionvest Realty, we bring you the best living and commercial spaces —
            places built on quality, location, and long-term value. Let us help you
            find the property that matches your ambitions."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
