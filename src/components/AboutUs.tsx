
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { useRef, useEffect, useState } from "react";
import { Brain, Sparkles, CheckCircle } from "lucide-react";

// Enhanced typing text effect component
const TypingText = ({ text, delay = 0, speed = 50 }: { text: string; delay?: number; speed?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);
  
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setStartTyping(true);
    }, delay);
    
    return () => clearTimeout(delayTimer);
  }, [delay]);
  
  useEffect(() => {
    if (!startTyping) return;
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, startTyping, speed]);
  
  return (
    <span className="relative">
      {displayText}
      <span 
        className="absolute right-[-4px] top-1 h-full w-[2px] bg-lion-gold animate-pulse" 
        style={{ opacity: currentIndex < text.length ? 1 : 0 }}
      />
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
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const rotate = useTransform(scrollYProgress, [0, 1], [1, -1]);
  
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  // 3D tilt effect for glass cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (centerY - y) / 20;
    const tiltY = (x - centerX) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <section id="about" ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Abstract background shapes with enhanced design */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-purple-500/20 filter blur-[100px]"></div>
        <div className="absolute bottom-40 right-[15%] w-80 h-80 rounded-full bg-blue-500/10 filter blur-[120px]"></div>
        <div className="absolute top-[40%] right-[30%] w-48 h-48 rounded-full bg-lion-gold/10 filter blur-[80px]"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzlmOWY5ZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        {/* Floating elements */}
        <motion.div 
          className="absolute top-1/4 left-[5%] w-6 h-6 rounded-full border border-lion-gold/30"
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-[8%] w-4 h-4 rounded-full border border-lion-gold/20"
          animate={{ y: [-8, 8, -8], opacity: [0.2, 0.5, 0.2] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
        />
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            style={{ y: textY, scale }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-lion-gold" />
                <h2 className="text-sm uppercase tracking-wider text-lion-gold font-medium">About us</h2>
              </div>
              
              <h3 className="text-5xl font-display text-lion-black mb-8 brutalist-text relative">
                {isInView ? (
                  <TypingText text="About Lionvest Realty" delay={300} />
                ) : (
                  "About Lionvest Realty"
                )}
                <div className="absolute -bottom-2 left-0 h-1 w-24 bg-gradient-to-r from-lion-gold/0 via-lion-gold to-lion-gold/0"></div>
              </h3>
              
              <div 
                className="glass-depth p-8 mb-8 space-y-4 text-gray-700 relative rounded-2xl"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="absolute -top-5 -left-5 w-10 h-10 bg-gradient-to-br from-lion-gold to-amber-400 rounded-full flex items-center justify-center shadow-lg">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                
                {/* Glass shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-10 rounded-2xl"></div>
                
                <p className="relative z-10 text-lg">
                  At Lionvest Realty Pvt. Ltd., We are committed to providing seamless and expert real estate solutions for residential and commercial property buyers in Delhi, Noida and Gurgaon. With a vision to simplify property transactions, we provide strategic guidance and unmatched support to help you make informed investment decisions.
                </p>
                <p className="text-lg">
                  Our name, "Lionvest" is more than just one brand, it is a symbol of the strength, confidence and reliability that brings into the real estate market. The lion symbol:
                </p>
              </div>
              
              <motion.div 
                className="clay-pastel p-8 space-y-5 mb-8 rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {[
                  {label: "Strength and power", desc: "Performing our dominance and leadership in the real estate industry."},
                  {label: "Courage and belief", desc: "to empower customers with bold, well informed investment options."},
                  {label: "Authority and reputation", desc: "establishing faith through reliability, expertise and excellence."},
                  {label: "Protection and reliability", desc: "to ensure safe and transparent property transactions."}
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-lion-gold/30 to-amber-400/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-lion-gold" />
                    </div>
                    <div>
                      <span className="font-semibold text-estate-800">{item.label}:</span>{" "}
                      <span className="text-estate-500">{item.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="glass-depth-card p-8 text-gray-700 rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <p className="text-lg mb-6">
                  With a client-first approach, we are proud to give real estate solutions supported by deep market insight and unwavering integrity. Whether you are looking for your dream house or a strategic commercial investment, Lionvest Realty Private. Limited Dynamic is your reliable partner in navigating the real estate landscape.
                </p>
                <Button 
                  className="bg-gradient-to-r from-lion-gold to-amber-500 hover:from-lion-darkgold hover:to-amber-600 text-black font-medium px-8 py-6 h-auto text-lg shadow-lg btn-glow btn-3d group relative overflow-hidden"
                >
                  <span className="relative z-10">Learn More</span>
                  
                  {/* Animated glow effect */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative h-full flex items-center justify-center"
            style={{ y: imageY, opacity, rotateZ: rotate }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* 3D layered card effect */}
            <div className="absolute -top-10 -left-10 w-full h-full rounded-2xl bg-lion-gold/5 transform rotate-6"></div>
            <div className="absolute -bottom-10 -right-10 w-full h-full rounded-2xl bg-lion-gold/10 transform -rotate-6"></div>
            
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl card-3d w-full">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
                alt="Modern building"
                className="w-full h-[600px] object-cover"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              
              {/* Info card with glassmorphism */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="glass-depth-card p-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl">
                  <h3 className="text-2xl font-display text-white mb-3">Luxury Real Estate</h3>
                  <p className="text-white/80">Discover premium properties carefully selected for discerning investors</p>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-lion-gold/40"></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-lion-gold/30"></div>
                </div>
              </div>
            </div>
            
            {/* Stats badge */}
            <div className="absolute -bottom-6 -right-6 glass-depth-dark w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <span className="gold-gradient-text text-4xl font-bold">12+</span>
              <span className="text-sm text-white/90">Years Experience</span>
            </div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-4 -left-4 w-8 h-8 rounded-full border border-lion-gold/30"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
