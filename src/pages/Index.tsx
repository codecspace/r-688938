
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
    // Extend loading time to 5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      <motion.div 
        className="min-h-screen bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
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
    </>
  );
};

export default Index;
