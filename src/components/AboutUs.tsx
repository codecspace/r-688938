import { Reveal, StaggerGroup, StaggerItem } from "@/components/layout/Reveal";
import { SplitHeading, Parallax } from "@/components/layout/Editorial";
import { useSiteContent } from "@/context/SiteContentContext";

/**
 * Asymmetric editorial chapter: a 7/5 split with a manifesto column and a
 * tall parallaxed portrait plate. Hairlines instead of cards.
 */
const AboutUs = () => {
  const { content } = useSiteContent();
  const about = content.about;
  const traits = about.traits;

  return (
    <section id="about" className="relative bg-lion-paper py-24 md:py-36 overflow-hidden">

      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Manifesto */}
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow mb-8">{about.eyebrow}</span>
            </Reveal>

            <SplitHeading
              text={about.heading}
              className="font-display text-display-md text-lion-black max-w-[18ch] mb-10"
            />

            <Reveal delay={0.1} className="space-y-6 text-lion-ink/70 text-lg leading-relaxed max-w-2xl">
              {about.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </Reveal>


            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 mt-14 border-t border-black/10" stagger={0.09}>
              {traits.map((item) => (
                <StaggerItem key={item.label} className="border-b border-black/10 py-6 group">
                  <div className="flex items-baseline gap-4">
                    <span className="index-num">{item.n}</span>
                    <div>
                      <h3 className="font-display text-xl text-lion-black mb-1 group-hover:text-lion-darkgold transition-colors">
                        {item.label}
                      </h3>
                      <p className="text-lion-stone text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal delay={0.15}>
              <p className="text-lion-ink/70 text-lg leading-relaxed pt-10 max-w-2xl">
                {about.closing}
              </p>
            </Reveal>
          </div>

          {/* Plate */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Parallax distance={40} className="media-frame h-[460px] md:h-[620px]">
                <img
                  src={about.image || "/about-advisory.webp"}
                  alt="Advisor and client reviewing a property shortlist"
                  loading="lazy"
                  decoding="async"
                  width={900}
                  height={676}
                  className="w-full h-[120%] object-cover"
                />

              </Parallax>


              <Reveal delay={0.1} className="border-t border-black/15 mt-6 pt-5 flex items-baseline justify-between gap-6">
                <div>
                  <p className="font-display text-2xl text-lion-black leading-tight">Delhi NCR, since 2013</p>
                  <p className="text-lion-stone text-sm mt-1">Residential &amp; commercial advisory</p>
                </div>
                <span className="font-display text-5xl text-lion-gold leading-none tabular-nums">12+</span>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
