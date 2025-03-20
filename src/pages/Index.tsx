
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import VisionMission from "@/components/VisionMission";
import Projects from "@/components/Projects";
import Team from "@/components/Team";
import FeaturedProperties from "@/components/FeaturedProperties";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ErrorBoundary } from "react-error-boundary";

// Simple fallback component for 3D background
const FallbackBackground = () => (
  <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-gray-100 to-white opacity-50"></div>
);

// Simplified background component that doesn't use 3D
const SafeBackground = () => (
  <div className="fixed inset-0 z-[-1] opacity-30 pointer-events-none bg-gradient-to-b from-gray-50 to-white"></div>
);

const ThreeDBackground = () => (
  <ErrorBoundary FallbackComponent={FallbackBackground}>
    <SafeBackground />
  </ErrorBoundary>
);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Pre-load main content to prevent white flash
    const preloadImages = () => {
      const images = [
        "https://imgur.com/ku5rlCk.jpg",
        "https://i.imgur.com/YQSL3gr.jpg",
        "https://i.imgur.com/VIVNtTM.jpg",
        "https://i.imgur.com/Tm5t9pp.jpg",
        "https://i.imgur.com/1qjWa6d.jpg",
        "https://i.imgur.com/V3ZYKie.jpg",
        "https://i.postimg.cc/N0dcJVDT/AIPL-Joy-District-Sector-88-Gurgaon-1719656222.webp",
        "https://i.postimg.cc/vBpHhk8h/image.png", 
        "https://i.postimg.cc/XqdNzLpb/image.png",
        "https://i.postimg.cc/dVmnGZmN/image.png",
        "https://i.postimg.cc/MHQmHnpD/image.png",
        "https://i.postimg.cc/rF59LRby/image.png",
        "https://i.postimg.cc/nhkYXbp6/image.png",
        "https://i.postimg.cc/d0VRdH0D/image.png",
        "https://i.postimg.cc/vB1W24fs/image.png"
      ];
      
      const promises = images.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // Continue even if an image fails to load
          img.src = src;
        });
      });
      
      return Promise.all(promises);
    };
    
    // Set document background to black during transition to prevent white flash
    document.body.style.backgroundColor = '#000';
    
    // Load images then show content
    preloadImages()
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
          // Reset background color after content is loaded
          setTimeout(() => {
            document.body.style.backgroundColor = '';
          }, 300);
        }, 1500); // Reduced loading time further
      })
      .catch(err => {
        console.error("Error preloading images:", err);
        setIsLoading(false);
        document.body.style.backgroundColor = '';
      });
    
  }, []);

  return (
    <ErrorBoundary FallbackComponent={() => (
      <div className="min-h-screen w-full bg-gray-50 p-4">
        <h1 className="text-xl font-semibold">Lionvest Realty</h1>
        <p>There was an error loading the page content. Please refresh the page.</p>
      </div>
    )}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div 
            key="content"
            className="min-h-screen w-full overflow-hidden bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <ThreeDBackground />
            <Navbar />
            <Hero />
            <AboutUs />
            <VisionMission />
            <Projects />
            <Team />
            <FeaturedProperties />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
};

export default Index;
