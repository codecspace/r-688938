import { Suspense, lazy } from "react";

// Layout Components (light, above-the-fold)
import ScrollProgress from "@/components/layout/ScrollProgress";
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
    <>
      <ScrollProgress />

      <div className="page-wrapper">
        <div className="min-h-screen w-full overflow-hidden bg-white">
          <Navbar />

          <div id="home"><Hero /></div>

          <Suspense fallback={null}>
            <SmoothScroll>
              <ScrollToTop />
              <NavDots />

              <div id="about"><AboutUs /></div>
              <div id="vision-mission">
                <VisionMission />
                <Stats />
                <Marquee items={TICKER_ITEMS} className="bg-lion-obsidian py-5 text-white/40" />
              </div>
              <div id="projects"><Projects /></div>
              <div id="team"><Team /></div>
              <div id="properties">
                <FeaturedProperties />
                <Marquee items={TICKER_ITEMS} reverse className="bg-lion-ivory py-5 text-lion-black/30 border-y border-black/5" />
              </div>

              <SimpleContact />
              <Footer />
            </SmoothScroll>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Index;
