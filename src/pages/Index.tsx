import { Suspense, lazy } from "react";

// Above-the-fold
import ScrollProgress from "@/components/layout/ScrollProgress";
import PageTransition from "@/components/layout/PageTransition";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// Below-the-fold — loaded after first paint so LCP isn't blocked
const ScrollToTop = lazy(() => import("@/components/layout/ScrollToTop"));
const NavDots = lazy(() => import("@/components/layout/NavDots"));
const SmoothScroll = lazy(() => import("@/components/layout/SmoothScroll"));
const Marquee = lazy(() => import("@/components/layout/Marquee"));
const AboutUs = lazy(() => import("@/components/AboutUs"));
const VisionMission = lazy(() => import("@/components/VisionMission"));
const Stats = lazy(() => import("@/components/Stats"));
const Projects = lazy(() => import("@/components/Projects"));
const Team = lazy(() => import("@/components/Team"));
const FeaturedProperties = lazy(() => import("@/components/FeaturedProperties"));
const SimpleContact = lazy(() => import("@/components/SimpleContact"));
const Footer = lazy(() => import("@/components/Footer"));

const TICKER_ITEMS = ["Delhi", "Gurugram", "Noida", "Luxury Real Estate", "Lionvest Realty"];

const Index = () => {
  return (
    <PageTransition animateIn={false}>
      <ScrollProgress />


      <div className="min-h-screen w-full overflow-x-hidden bg-lion-paper">
        <Navbar />

        <main>
          <Hero />

          <Suspense fallback={null}>
            <SmoothScroll>
              <ScrollToTop />
              <NavDots />

              <AboutUs />

              <Marquee
                items={TICKER_ITEMS}
                className="bg-lion-paper py-6 border-y border-black/10 text-lion-black/35"
              />

              <section id="vision-mission">
                <VisionMission />
                <Stats />
              </section>

              <Projects />
              <Team />

              <FeaturedProperties />

              <Marquee
                items={TICKER_ITEMS}
                reverse
                className="bg-lion-paper py-6 border-y border-black/10 text-lion-black/35"
              />

              <SimpleContact />
              <Footer />
            </SmoothScroll>
          </Suspense>
        </main>
      </div>
    </>
  );
};

export default Index;
