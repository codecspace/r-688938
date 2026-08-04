import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projectsData } from "@/data/projectsData";
import { highlightedProjects } from "@/components/Projects";
import { ArrowUpRight } from "lucide-react";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/layout/Reveal";
import { SplitHeading } from "@/components/layout/Editorial";
import ImageWithFallback from "@/components/layout/ImageWithFallback";

const CITIES = ["Gurugram", "Noida", "Delhi"] as const;

/** Listings write the same city a few different ways. */
const CITY_ALIASES: Record<string, string[]> = {
  Gurugram: ["gurugram", "gurgaon"],
  Noida: ["noida"],
  Delhi: ["delhi"],
};

const inCity = (location: string | undefined, city: string) =>
  (CITY_ALIASES[city] ?? [city.toLowerCase()]).some((alias) =>
    (location ?? "").toLowerCase().includes(alias)
  );

/**
 * The rest of the portfolio — everything the Projects section above didn't
 * already showcase, so the homepage never lists the same address twice.
 * A single row of city chips does the filtering; no competing controls.
 */
const FeaturedProperties = () => {
  const [city, setCity] = useState<string>("All");

  const remaining = useMemo(() => {
    const shownAbove = new Set(highlightedProjects.map((p) => p.id));
    return projectsData.filter((p) => !shownAbove.has(p.id));
  }, []);

  /** Only offer a city chip when there is inventory behind it. */
  const availableCities = useMemo(
    () => CITIES.filter((c) => remaining.some((p) => inCity(p.location, c))),
    [remaining]
  );

  const visible = useMemo(
    () =>
      city === "All"
        ? remaining
        : remaining.filter((p) => inCity(p.location, city)),
    [remaining, city]
  );

  if (remaining.length === 0) return null;

  /** A single-city portfolio doesn't need a filter row. */
  const chips = availableCities.length > 1 ? ["All", ...availableCities] : [];

  return (
    <section id="properties" className="bg-lion-paper2 py-24 md:py-36">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10 md:mb-14">
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

        {chips.length > 1 && (
          <Reveal delay={0.05}>
            <div
              role="group"
              aria-label="Filter listings by city"
              className="flex flex-wrap items-center gap-2 border-t border-black/12 pt-6 mb-12 md:mb-16"
            >
              {chips.map((chip) => {
                const active = chip === city;
                const count =
                  chip === "All"
                    ? remaining.length
                    : remaining.filter((p) => inCity(p.location, chip)).length;

                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setCity(chip)}
                    aria-pressed={active}
                    className={`h-9 px-4 text-[0.65rem] uppercase tracking-[0.2em] border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lion-gold focus-visible:ring-offset-2 focus-visible:ring-offset-lion-paper2 ${
                      active
                        ? "bg-lion-black text-white border-lion-black"
                        : "bg-transparent text-lion-ink/70 border-black/15 hover:border-lion-gold hover:text-lion-black"
                    }`}
                  >
                    {chip}
                    <span className={active ? "ml-2 text-white/50" : "ml-2 text-lion-stone"}>{count}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        )}

        {visible.length === 0 ? (
          <div className="border-t border-black/12 py-20 text-center">
            <p className="font-display text-2xl text-lion-black">Nothing open in {city} right now.</p>
            <button
              type="button"
              onClick={() => setCity("All")}
              className="mt-4 text-[0.65rem] uppercase tracking-[0.22em] text-lion-darkgold hover:text-lion-black transition-colors"
            >
              Show all listings
            </button>
          </div>
        ) : (
          <StaggerGroup
            key={city}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-10"
            stagger={0.07}
          >
            {visible.map((property) => (
              <StaggerItem key={property.id}>
                <Link
                  to={`/project/${property.id}`}
                  className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lion-gold focus-visible:ring-offset-4 focus-visible:ring-offset-lion-paper2"
                >
                  <div className="media-frame media-zoom aspect-[4/3]">
                    <ImageWithFallback
                      src={property.heroImage || property.images?.[0] || property.image}
                      alt={property.propertyName}
                      fallbackLabel={property.propertyName}
                      width={560}
                      height={420}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    {(property.isNew || property.isFeatured) && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-lion-obsidian/80 text-lion-lightgold text-[0.55rem] uppercase tracking-[0.24em] px-3 py-1.5 backdrop-blur-sm">
                          {property.isNew ? "New" : "Featured"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-black/15 mt-5 pt-5 transition-colors duration-500 group-hover:border-lion-gold">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <span className="text-lion-gold text-[0.58rem] uppercase tracking-[0.28em]">
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
                        className="w-5 h-5 text-lion-black/35 shrink-0 mt-1 transition-all duration-500 group-hover:text-lion-gold group-hover:translate-x-1 group-hover:-translate-y-1"
                        strokeWidth={1.25}
                      />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
