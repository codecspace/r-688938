
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center" id="home">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-lion-black/80 to-lion-black/40" />
      </div>
      <div className="relative z-10 container mx-auto px-8 text-left max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-xl"
        >
          <h1 className="text-5xl md:text-7xl font-display text-white mb-6 leading-tight">
            The Right Home for
            <span className="text-lion-gold"> Every Lifestyle</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-md">
            From browsing listings to unlocking your dream home, your journey begins with us—where every search leads to a new beginning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-lion-gold hover:bg-lion-darkgold text-black font-medium px-8 py-6"
              size="lg"
            >
              Explore Properties
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 px-8 py-6"
              size="lg"
            >
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
