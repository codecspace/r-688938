import { Suspense, lazy } from "react";

// Above-the-fold
import ScrollProgress from "@/components/layout/ScrollProgress";
import PageTransition from "@/components/layout/PageTransition";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SceneCanvas from "@/components/three/SceneCanvas";
import SmoothScroll from "@/components/layout/SmoothScroll";

// Below-the-fold — loaded after first paint so LCP isn't blocked
const ScrollToTop = lazy(() => import("@/components/layout/ScrollToTop"));
const NavDots = lazy(() => import("@/components/layout/NavDots"));
const Marquee = lazy(() => import("@/components/layout/Marquee"));
const AboutUs = lazy(() => import("@/components/AboutUs"));
const VisionMission = lazy(() => import("@/components/VisionMission"));
const Stats = lazy(() => import("@/components/Stats"));
const Services = lazy(() => import("@/components/Services"));
const Projects = lazy(() => import("@/components/Projects"));
const Team = lazy(() => import("@/components/Team"));
const FeaturedProperties = lazy(() => import("@/components/FeaturedProperties"));
const SimpleContact = lazy(() => import("@/components/SimpleContact"));
const Footer = lazy(() => import("@/components/Footer"));

const TICKER_ITEMS = ["Delhi", "Gurugram", "Noida", "Luxury Real Estate", "Lionvest Realty"];

/**
 * The homepage is one continuous scroll timeline. A single fixed WebGL scene
 * sits behind everything (SceneCanvas) and the sections below scroll over it —
 * scroll position scrubs the camera, lighting and fog rather than just moving
 * the page. Sections that carry a lot of reading use a veil so the type stays
 * legible; the cinematic beats stay fully transparent.
 */
const Index = () => {
  return (
    <PageTransition animateIn={false}>
      <ScrollProgress />

      <div className="relative min-h-screen w-full overflow-x-hidden bg-lion-obsidian text-white">
        <SceneCanvas />

        <div className="relative z-10">
          <Navbar />

          <main>
            <Hero />

            <SmoothScroll>
              <Suspense fallback={null}>
                <ScrollToTop />
                <NavDots />

                {/* Beat 2 — floating property panels over the moving scene */}
                <FeaturedProperties />

                <Marquee
                  items={TICKER_ITEMS}
                  className="veil-solid py-6 border-y border-white/10 text-white/25"
                />

                {/* Beat 3 — about */}
                <div className="veil-solid">
                  <AboutUs />
                  <VisionMission />
                  <Stats />
                </div>

                {/* Beat 4 — services, camera cranes above the form */}
                <Services />

                <div className="veil-solid">
                  <Projects />
                  <Team />
                </div>

                <Marquee
                  items={TICKER_ITEMS}
                  reverse
                  className="veil-solid py-6 border-y border-white/10 text-white/25"
                />

                {/* Beat 5 — contact */}
                <SimpleContact />
                <Footer />
              </Suspense>
            </SmoothScroll>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
