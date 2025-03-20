
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
import { Canvas } from "@react-three/fiber";
import { Environment, Stars } from "@react-three/drei";
import RotatingCube from "@/components/3d/RotatingCube";

const ThreeDBackground = () => (
  <div className="fixed inset-0 z-[-1] opacity-30 pointer-events-none">
    <Canvas>
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="sunset" />
    </Canvas>
  </div>
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
      
      images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preloadImages();
    
    // Set document background to black during transition to prevent white flash
    document.body.style.backgroundColor = '#000';
    
    // Reduced loading time to 2.5 seconds for a quicker experience
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Reset background color after content is loaded
      setTimeout(() => {
        document.body.style.backgroundColor = '';
      }, 300);
    }, 2500); // Reduced from 5000ms to 2500ms
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
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
            transition={{ duration: 0.8, ease: "easeInOut" }} // Faster transition
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
    </>
  );
};

export default Index;
