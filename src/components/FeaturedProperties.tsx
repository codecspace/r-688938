import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { projectsData } from "@/data/projectsData";
import { MapPin } from "lucide-react";
import ImageWithFallback from "@/components/layout/ImageWithFallback";
import SplitReveal from "@/components/layout/SplitReveal";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";

const FeaturedProperties = () => {
  /**
   * ScrollTrigger.batch groups cards that enter together into a single
   * staggered tween, so a row reads as one gesture rather than three
   * independent fades. Each card image also gets a slow inner parallax.
   */
  const scope = useGsap<HTMLElement>((_ctx, root) => {
    if (prefersReducedMotion()) return;

    const cards = gsap.utils.toArray<HTMLElement>("[data-card]", root);
    gsap.set(cards, { y: 40, opacity: 0 });

    ScrollTrigger.batch(cards, {
      start: "top 88%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" }),
    });

    cards.forEach((card) => {
      const img = card.querySelector("[data-img]");
      if (!img) return;
      gsap.fromTo(
        img,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 0.5 },
        }
      );
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
    <section ref={scope} id="properties" className="py-24 md:py-32 bg-lion-ivory">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <span className="eyebrow justify-center mb-3">Featured</span>
          <SplitReveal
            as="h3"
            className="font-display text-4xl md:text-6xl text-lion-black mb-4 leading-[1.05] tracking-tight"
          >
            Properties worth a second look
          </SplitReveal>
          <div data-rule className="w-16 h-px bg-lion-gold mx-auto mt-6 origin-center" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((property) => (
            <div
              key={property.id}
              data-card
              className="group cursor-pointer backdrop-blur-sm bg-white/50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 will-change-transform"
            >
              <Link to={`/project/${property.id}`}>
                <div className="relative overflow-hidden rounded-t-xl h-[280px]">
                  <div className="absolute top-3 left-3 z-20 flex gap-2">
                    {property.isNew && (
                      <Badge className="bg-lion-black/90 backdrop-blur-sm text-lion-gold border border-lion-gold/40 py-1 shadow-md">
                        New Offer
                      </Badge>
                    )}
                    {property.isFeatured && (
                      <Badge className="bg-gradient-to-r from-lion-gold to-lion-darkgold text-lion-black border-none py-1 shadow-md font-medium">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <div className="bg-gradient-to-t from-lion-black to-transparent absolute inset-0 z-10 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                  <ImageWithFallback
                    data-img
                    src={property.heroImage || property.images?.[0] || property.image}
                    alt={property.propertyName}
                    fallbackLabel={property.propertyName}
                    className="w-full h-full object-cover object-center scale-[1.14] will-change-transform"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white backdrop-blur-sm bg-black/20">
                    <h4 className="text-xl font-semibold mb-1 group-hover:text-lion-gold transition-colors duration-300">{property.propertyName}</h4>
                    <div className="flex items-center mt-1 text-gray-200">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
