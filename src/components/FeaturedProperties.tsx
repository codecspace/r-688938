import { Link } from "react-router-dom";
import { projectsData } from "@/data/projectsData";
import { highlightedProjects } from "@/components/Projects";
import { ArrowUpRight } from "lucide-react";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/layout/Reveal";
import { SplitHeading } from "@/components/layout/Editorial";
import ImageWithFallback from "@/components/layout/ImageWithFallback";

/**
 * The rest of the portfolio — everything the Projects section above didn't
 * already showcase, so the homepage never lists the same address twice.
 */
const FeaturedProperties = () => {
  const shownAbove = new Set(highlightedProjects.map((p) => p.id));
  const remaining = projectsData.filter((p) => !shownAbove.has(p.id));

  if (remaining.length === 0) return null;

  return (
    <section id="properties" className="bg-lion-paper2 py-24 md:py-36">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
          <div>
            <Reveal>
              <span className="eyebrow mb-6">More listings</span>
            </Reveal>
            <SplitHeading
              text="Addresses worth a second look."
              className="font-display text-display-sm text-lion-black max-w-[14ch]"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="text-lion-stone text-sm max-w-xs leading-relaxed md:text-right">
              Currently open for enquiry across Gurugram, Noida and Delhi.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10" stagger={0.09}>
          {remaining.map((property) => (

            <StaggerItem key={property.id}>
              <Link to={`/project/${property.id}`} className="group block h-full">
                <div className="media-frame media-zoom h-[300px] md:h-[340px]">
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
                  {(property.isNew || property.isFeatured) && (
                    <div className="absolute top-4 left-4 flex gap-2 z-10">
                      {property.isNew && (
                        <span className="bg-lion-obsidian/85 text-lion-lightgold text-[0.6rem] uppercase tracking-[0.22em] px-3 py-1.5">
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

                <div className="border-t border-black/15 mt-5 pt-5 transition-colors duration-500 group-hover:border-lion-gold">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-lion-gold text-[0.6rem] uppercase tracking-[0.28em]">
                        {property.developerName}
                      </span>
                      <h3 className="font-display text-2xl text-lion-black mt-2 leading-tight">
                        {property.propertyName}
                      </h3>
                      <p className="text-lion-stone text-xs uppercase tracking-[0.18em] mt-2">
                        {property.location}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="w-5 h-5 text-lion-black/40 shrink-0 mt-1 transition-all duration-500 group-hover:text-lion-gold group-hover:translate-x-1 group-hover:-translate-y-1"
                      strokeWidth={1.25}
                    />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
};

export default FeaturedProperties;
