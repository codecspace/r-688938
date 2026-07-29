import { Reveal, StaggerGroup, StaggerItem } from "@/components/layout/Reveal";
import { SplitHeading, Parallax } from "@/components/layout/Editorial";

const traits = [
  { n: "01", label: "Strength and power", desc: "Leadership and conviction in every Delhi NCR market we operate in." },
  { n: "02", label: "Courage and belief", desc: "Bold, well-informed investment options — never guesswork." },
  { n: "03", label: "Authority and reputation", desc: "Faith built through reliability, expertise, and excellence." },
  { n: "04", label: "Protection and reliability", desc: "Safe, transparent property transactions, start to finish." },
];

/**
 * Asymmetric editorial chapter: a 7/5 split with a manifesto column and a
 * tall parallaxed portrait plate. Hairlines instead of cards.
 */
const AboutUs = () => {
  return (
    <section id="about" className="relative bg-lion-paper py-24 md:py-36 overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Manifesto */}
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow mb-8">About the firm</span>
            </Reveal>

            <SplitHeading
              text="A property advisory built on judgement, not volume."
              className="font-display text-display-md text-lion-black max-w-[18ch] mb-10"
            />

            <Reveal delay={0.1} className="space-y-6 text-lion-ink/70 text-lg leading-relaxed max-w-2xl">
              <p>
                Lionvest Realty Pvt. Ltd. provides seamless, expert guidance for residential and
                commercial buyers across Delhi, Noida, and Gurugram — simplifying transactions
                with strategic advice and support at every step.
              </p>
              <p>
                Our name is more than a brand. <span className="serif-accent">Lionvest</span> stands for
                the strength, confidence, and reliability we bring to the market.
              </p>
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
                With a client-first approach, we back every recommendation with deep market
                insight and unwavering integrity — whether you are searching for a home or a
                strategic commercial investment.
              </p>
            </Reveal>
          </div>

          {/* Plate */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Parallax distance={40} className="media-frame h-[460px] md:h-[620px]">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=68"
                  alt="Modern residential facade in Delhi NCR"
                  loading="lazy"
                  decoding="async"
                  width={900}
                  height={620}
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
