
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { useRef, useEffect, useState } from "react";
import { Brain, Sparkles } from "lucide-react";

// Typing text effect component
const TypingText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);
  
  return (
    <span className="relative">
      {displayText}
      <span className="absolute right-[-4px] top-0 h-full w-[2px] bg-lion-gold animate-pulse" 
            style={{ opacity: currentIndex < text.length ? 1 : 0 }}>
      </span>
    </span>
  );
};

const AboutUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  useEffect(() => {
    // Simulate typing completion after 2 seconds for the header
    const timeout = setTimeout(() => {
      setIsTypingComplete(true);
    }, 2000);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-purple-500/30 filter blur-[100px]"></div>
        <div className="absolute bottom-40 right-[15%] w-80 h-80 rounded-full bg-blue-500/20 filter blur-[120px]"></div>
      </div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10"></div>
      
      <div ref={containerRef} className="container mx-auto px-4 max-w-6xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ y: textY }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-lion-gold" />
                <h2 className="text-sm uppercase tracking-wider text-lion-gold">About us</h2>
              </div>
              
              <h3 className="text-4xl font-display text-lion-black mb-6 relative">
                {isTypingComplete ? (
                  "About Lionvest Realty"
                ) : (
                  <TypingText text="About Lionvest Realty" />
                )}
              </h3>
              
              <div className="clay-pastel p-6 mb-6 space-y-4 text-gray-700 relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-lion-gold rounded-full flex items-center justify-center shadow-lg">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <p className="relative z-10">
                  At Lionvest Realty Pvt. Ltd., We are committed to providing seamless and expert real estate solutions for residential and commercial property buyers in Delhi, Noida and Gurgaon. With a vision to simplify property transactions, we provide strategic guidance and unmatched support to help you make informed investment decisions.
                </p>
                <p>
                  Our name, "Lionvest" is more than just one brand, it is a symbol of the strength, confidence and reliability that brings into the real estate market. The lion symbol:
                </p>
              </div>
              
              <motion.ul 
                className="glass-depth-card p-6 space-y-3 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {[
                  {label: "Strength and power", desc: "Performing our dominance and leadership in the real estate industry."},
                  {label: "Courage and belief", desc: "to empower customers with bold, well informed investment options."},
                  {label: "Authority and reputation", desc: "establishing faith through reliability, expertise and excellence."},
                  {label: "Protection and reliability", desc: "to ensure safe and transparent property transactions."}
                ].map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="h-6 w-6 rounded-full bg-lion-gold/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-lion-gold"></div>
                    </div>
                    <div>
                      <span className="font-semibold">{item.label}:</span> {item.desc}
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
              
              <motion.div 
                className="glass-depth p-6 text-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <p>
                  With a client-first approach, we are proud to give real estate solutions supported by deep market insight and unwavering integrity. Whether you are looking for your dream house or a strategic commercial investment, Lionvest Realty Private. Limited Dynamic is your reliable partner in navigating the real estate landscape.
                </p>
                <Button className="mt-6 bg-lion-gold hover:bg-lion-darkgold text-black btn-glow btn-3d">
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative"
            style={{ y: imageY, opacity }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="absolute -top-8 -left-8 w-full h-full rounded-lg bg-lion-gold/10 transform rotate-3"></div>
            <div className="absolute -bottom-8 -right-8 w-full h-full rounded-lg bg-lion-gold/5 transform -rotate-3"></div>
            
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl card-3d">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
                alt="Modern building"
                className="w-full h-[500px] object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="glass-shimmer rounded-lg p-4 backdrop-blur-md bg-white/10">
                  <h3 className="text-xl font-semibold mb-2">Luxury Real Estate</h3>
                  <p className="text-sm opacity-90">Discover premium properties carefully selected for discerning investors</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 glass-depth-dark w-24 h-24 rounded-full flex items-center justify-center">
              <span className="gold-gradient-text text-4xl font-bold">12+</span>
              <span className="text-xs text-white/80 absolute bottom-6">Years Exp.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
