
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import HeroScene from "./3d/HeroScene";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden" id="home">
      {/* 3D Background Scene */}
      <HeroScene />
      
      {/* Animated background with gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-lion-black/90 to-lion-black/50" />
        
        {/* Modern blur element */}
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-8 text-left max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-xl backdrop-blur-sm bg-black/10 p-8 rounded-2xl"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-display text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            The Right Home for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lion-gold to-lion-lightgold"> Every Lifestyle</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 mb-8 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            From browsing listings to unlocking your dream home, your journey begins with us—where every search leads to a new beginning.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Button 
              className="bg-gradient-to-r from-lion-gold to-lion-darkgold hover:from-lion-darkgold hover:to-lion-gold text-black shadow-lg hover:shadow-xl transition-all font-medium px-8 py-6 rounded-md"
              size="lg"
              onClick={() => scrollToSection('properties')}
            >
              Explore Properties
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-white/70 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-lion-gold hover:text-lion-gold transition-all px-8 py-6 rounded-md shadow-md"
              size="lg"
              onClick={() => scrollToSection('contact')}
            >
              Contact Us
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
