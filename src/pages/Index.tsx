
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

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Loading time of 5 seconds as requested
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-lion-black">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div 
            key="content"
            className="min-h-screen bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
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
    </div>
  );
};

export default Index;
