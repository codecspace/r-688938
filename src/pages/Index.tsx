
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Layout Components
import ScrollProgress from "@/components/layout/ScrollProgress";
import ScrollToTop from "@/components/layout/ScrollToTop";
import NavDots from "@/components/layout/NavDots";

// Page Components
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import VisionMission from "@/components/VisionMission";
import Projects from "@/components/Projects";
import Team from "@/components/Team";
import FeaturedProperties from "@/components/FeaturedProperties";
import SimpleContact from "@/components/SimpleContact";
import Footer from "@/components/Footer";

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
      
      images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preloadImages();
    
    // Set document background to black during transition to prevent white flash
    document.body.style.backgroundColor = '#000';
    
    // Increased loading time to 4.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Reset background color after content is loaded
      setTimeout(() => {
        document.body.style.backgroundColor = '';
      }, 300);
    }, 2388);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Page sections for easy navigation
  const sections = [
    { id: 'home', component: <Hero /> },
    { id: 'about', component: <AboutUs /> },
    { id: 'vision-mission', component: <VisionMission /> },
    { id: 'projects', component: <Projects /> },
    { id: 'team', component: <Team /> },
    { id: 'properties', component: <FeaturedProperties /> }
  ];

  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <NavDots />

      <motion.div
        className="page-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
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
              <Navbar />
              
              {/* Render all page sections */}
              {sections.map(section => (
                <div key={section.id} id={section.id}>
                  {section.component}
                </div>
              ))}
              
              <SimpleContact />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Index;
