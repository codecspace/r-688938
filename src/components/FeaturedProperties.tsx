import { Link } from "react-router-dom";
import { projectsData } from "@/data/projectsData";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/layout/Reveal";
import { SplitHeading } from "@/components/layout/Editorial";
import ImageWithFallback from "@/components/layout/ImageWithFallback";
import HorizontalScroll, { useHorizontalEligible } from "@/components/layout/HorizontalScroll";

type Property = (typeof projectsData)[number];

/** One gallery plate — identical in both the pinned row and the mobile snap row. */
const PropertyPlate = ({ property, index }: { property: Property; index: number }) => (
  <Link
    to={`/project/${property.id}`}
    className="group block shrink-0 w-[78vw] sm:w-[62vw] lg:w-[30vw] focus-visible:outline-none"
  >
    <div className="media-frame media-zoom h-[54vh] lg:h-[58vh] max-h-[520px]">
      <ImageWithFallback
        src={property.heroImage || property.images?.[0] || property.image}
        alt={property.propertyName}
        fallbackLabel={property.propertyName}
        width={720}
        height={520}
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

    <div className="border-t border-black/15 mt-5 pt-5 transition-colors duration-500 group-hover:border-lion-gold group-focus-visible:border-lion-gold">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="index-num">{String(index + 1).padStart(2, "0")}</span>
            <span className="h-px w-6 bg-lion-gold/60" />
            <span className="text-lion-gold text-[0.6rem] uppercase tracking-[0.28em]">
              {property.developerName}
            </span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl text-lion-black mt-3 leading-tight">
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
);

const SectionHead = ({ compact = false }: { compact?: boolean }) => (
  <div
    className={`container mx-auto px-6 md:px-8 max-w-7xl flex flex-col md:flex-row md:items-end md:justify-between gap-6 ${
      compact ? "mb-10" : "mb-14 md:mb-20"
    }`}
  >
    <div>
      <Reveal>
        <span className="eyebrow mb-5">Featured</span>
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
);

/**
 * Desktop: the gallery pins and travels sideways with scroll.
 * Touch / narrow / reduced-motion: a native snap-scroll row instead — same
 * plates, no pinning, nothing heavy for iOS Safari to fight with.
 */
const FeaturedProperties = () => {
  const pinned = useHorizontalEligible();

  if (!pinned) {
    return (
      <section id="properties" className="bg-lion-paper2 py-24 md:py-32 overflow-hidden">
        <SectionHead compact />
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 md:px-8 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {projectsData.map((property, i) => (
            <div key={property.id} className="snap-start">
              <PropertyPlate property={property} index={i} />
            </div>
          ))}
        </div>
        <p className="container mx-auto px-6 md:px-8 max-w-7xl mt-6 text-[0.6rem] uppercase tracking-[0.28em] text-lion-stone">
          Swipe to explore
        </p>
      </section>
    );
  }

  return (
    <section id="properties" className="bg-lion-paper2">
      <div className="pt-24 md:pt-32">
        <SectionHead />
      </div>

      <HorizontalScroll
        rowClassName="gap-10 px-[6vw] items-start"
        footer={(progress) => (
          <div className="container mx-auto px-6 md:px-8 max-w-7xl mt-10 flex items-center gap-6">
            <div className="h-px flex-1 bg-black/12 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-lion-gold transition-[width] duration-150"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span className="index-num shrink-0">
              {String(Math.min(projectsData.length, Math.round(progress * (projectsData.length - 1)) + 1)).padStart(2, "0")}
              {" / "}
              {String(projectsData.length).padStart(2, "0")}
            </span>
          </div>
        )}
      >
        {projectsData.map((property, i) => (
          <PropertyPlate key={property.id} property={property} index={i} />
        ))}
      </HorizontalScroll>

      <div className="pb-24 md:pb-32" />
    </section>
  );
};

export default FeaturedProperties;
