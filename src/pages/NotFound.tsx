import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RouteHead from "@/components/RouteHead";
import PageTransition from "@/components/layout/PageTransition";
import { RevealMask, Reveal } from "@/components/layout/Reveal";
import Magnetic from "@/components/layout/Magnetic";

const NotFound = () => (
  <PageTransition className="bg-transparent min-h-screen">
    <RouteHead
      title="Page Not Found — Lionvest Realty"
      description="The page you're looking for doesn't exist. Return to Lionvest Realty to browse premium residential and commercial properties across Delhi NCR."
      path="/404"
      noindex
    />
    <Navbar />

    <main id="main-content" tabIndex={-1} className="focus:outline-none">
      <section className="relative min-h-[85vh] flex items-center bg-lion-obsidian overflow-hidden">
        <div className="grain absolute inset-0" />
        <div className="absolute -top-32 -right-32 w-[36rem] h-[36rem] rounded-full bg-lion-gold/10 blur-3xl" />

        <div className="relative z-10 container mx-auto px-6 md:px-8 max-w-7xl py-32">
          <span className="eyebrow text-lion-lightgold inline-flex items-center gap-2 mb-8">
            <Compass className="w-3.5 h-3.5" strokeWidth={1.5} />
            Off the map
          </span>

          <h1 className="font-display text-display-lg text-white leading-none">
            <RevealMask>404</RevealMask>
          </h1>

          <Reveal delay={0.15}>
            <p className="font-display italic text-3xl md:text-4xl text-lion-lightgold mt-6">
              This address doesn't exist — yet.
            </p>
            <p className="text-white/60 max-w-md mt-6 leading-relaxed">
              The page you were looking for has moved, or was never here. Let's get you back to
              somewhere worth visiting.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="flex flex-wrap gap-4 mt-12 border-t border-white/15 pt-8">
              <Magnetic>
                <Link to="/" className="btn-editorial btn-gold">
                  <span>Return Home</span>
                </Link>
              </Magnetic>
              <Magnetic>
                <a href="/#projects" className="btn-editorial btn-outline-light">
                  <span>Browse Projects</span>
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </main>

    <Footer />
  </PageTransition>
);

export default NotFound;
