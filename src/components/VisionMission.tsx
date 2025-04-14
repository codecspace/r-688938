
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Book, Target, Sparkles, Lightbulb, ArrowRight, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const VisionMission = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacitySection = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scaleSection = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const rotateSection = useTransform(scrollYProgress, [0, 1], [-1, 1]);
  
  // Animation variants with enhanced transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // 3D card tilt effect with improved interaction
  const [visionTilt, setVisionTilt] = useState({ x: 0, y: 0 });
  const [missionTilt, setMissionTilt] = useState({ x: 0, y: 0 });
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
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, isVision: boolean) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (centerY - y) / 25;
    const tiltY = (x - centerX) / 25;
    
    if (isVision) {
      setVisionTilt({ x: tiltX, y: tiltY });
    } else {
      setMissionTilt({ x: tiltX, y: tiltY });
    }
  };
  
  const resetTilt = (isVision: boolean) => {
    if (isVision) {
      setVisionTilt({ x: 0, y: 0 });
    } else {
      setMissionTilt({ x: 0, y: 0 });
    }
  };

  // Typing text effect
  const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
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
      if (!startTyping || !isInView) return;
      
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, 40);
        
        return () => clearTimeout(timeout);
      }
    }, [currentIndex, text, startTyping, isInView]);
    
    return (
      <span className="relative">
        {displayText}
        <span 
          className="absolute right-[-4px] top-1/2 -translate-y-1/2 h-[60%] w-[3px] bg-lion-gold" 
          style={{ 
            opacity: currentIndex < text.length ? 1 : 0,
            animation: currentIndex < text.length ? "pulse 0.8s infinite" : "none"
          }}
        />
      </span>
    );
  };

  return (
    <motion.section 
      ref={containerRef}
      style={{ opacity: opacitySection, scale: scaleSection, rotateZ: rotateSection }}
      className="py-32 relative overflow-hidden bg-gradient-to-b from-lion-black to-zinc-900"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-purple-500/20 filter blur-[100px]"
          animate={{ 
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute bottom-40 right-[15%] w-80 h-80 rounded-full bg-blue-500/15 filter blur-[120px]"
          animate={{ 
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
        
        {/* Enhanced floating neon lines with glow */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div 
              key={i} 
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-lion-gold/50 to-transparent w-full"
              style={{
                top: `${15 + i * 20}%`,
                left: 0,
                opacity: 0.4,
                transform: `rotate(${i % 2 ? 0.5 : -0.5}deg)`,
                boxShadow: "0 0 10px rgba(212,175,55,0.5)"
              }}
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 3 + i * 0.5, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-lion-gold" />
            </motion.div>
            <h2 className="text-sm uppercase tracking-wider text-lion-gold font-medium">Our Philosophy</h2>
          </div>
          
          <h3 className="text-5xl font-display text-white mb-6 brutalist-text">
            <span className="relative inline-block mr-3">
              {isInView ? <TypingText text="Vision" delay={300} /> : "Vision"}
              <div className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-to-r from-lion-gold/0 via-lion-gold to-lion-gold/0"></div>
            </span>{" "}
            &{" "}
            <span className="relative inline-block">
              {isInView ? <TypingText text="Mission" delay={800} /> : "Mission"}
              <div className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-to-r from-lion-gold/0 via-lion-gold to-lion-gold/0"></div>
            </span>
          </h3>
          
          <p className="text-gray-300 max-w-2xl mx-auto text-lg mt-6">
            We are committed to creating exceptional real estate experiences that transform lives and communities.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20"
        >
          {/* Vision Card with enhanced design */}
          <motion.div 
            variants={itemVariants} 
            className="h-full" 
            whileHover={{ y: -10 }} 
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Card 
              className="glass-depth-dark h-full overflow-hidden relative group"
              onMouseMove={(e) => handleMouseMove(e, true)}
              onMouseLeave={() => resetTilt(true)}
              style={{ 
                transform: `perspective(1000px) rotateX(${visionTilt.x}deg) rotateY(${visionTilt.y}deg)`,
                transition: "transform 0.1s ease"
              }}
            >
              {/* Enhanced gradient border and background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/5"></div>
              <div className="absolute -top-2 -right-2 -left-2 h-2 rounded-full bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0 glass-shimmer"></div>
              
              <CardContent className="p-10 relative z-10">
                <div className="flex items-center mb-10">
                  <div className="p-4 rounded-xl bg-blue-500/15 mr-5 backdrop-blur-lg">
                    <motion.div 
                      whileHover={{ rotate: 360 }} 
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className="relative"
                    >
                      <Target className="w-7 h-7 text-blue-400" />
                      <div className="absolute inset-0 bg-blue-400/30 blur-lg rounded-full"></div>
                    </motion.div>
                  </div>
                  <h3 className="brutalist-text text-4xl text-white">Our Vision</h3>
                </div>

                <div className="space-y-8 text-gray-300">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    viewport={{ once: true }}
                    className="neo-blur p-6 rounded-xl relative overflow-hidden"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      e.currentTarget.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(59, 130, 246, 0.2), rgba(30, 64, 175, 0.1))`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '';
                    }}
                  >
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
                    <p className="relative z-10 text-lg leading-relaxed">
                      Our vision is to be recognized as a leader in the real estate
                      industry, known for our unwavering commitment to quality,
                      transparency and customer-centric solutions. We aim to shape the
                      future of real estate by offering investment opportunities and
                      world-class experiences that fulfill the developed aspirations of
                      modern buyers and investors.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    viewport={{ once: true }}
                    className="neo-blur p-6 rounded-xl relative overflow-hidden"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      e.currentTarget.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(147, 51, 234, 0.2), rgba(79, 70, 229, 0.1))`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '';
                    }}
                  >
                    <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
                    <p className="relative z-10 text-lg leading-relaxed">
                      We expand our presence in the major residential and commercial
                      hubs, establishing new benchmarks in luxury, stability and
                      investment security. Through our expertise, we want to build a
                      real estate ecosystem, where each customer finds the right
                      assets, whether for residential enjoyment or commercial
                      prosperity.
                    </p>
                  </motion.div>
                </div>
                
                {/* Interactive floating indicators */}
                <div className="absolute bottom-6 right-6 flex items-center space-x-2">
                  <motion.div 
                    className="h-1.5 w-1.5 rounded-full bg-blue-400/60"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="h-1.5 w-1.5 rounded-full bg-blue-400/60"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
                  />
                  <motion.div 
                    className="h-1.5 w-1.5 rounded-full bg-blue-400/60"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
                  />
                </div>
                
                {/* Interactive corner decorations */}
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full border border-blue-400/30"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full border border-blue-400/20"></div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mission Card with enhanced design */}
          <motion.div 
            variants={itemVariants} 
            className="h-full" 
            whileHover={{ y: -10 }} 
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Card 
              className="glass-depth-dark h-full overflow-hidden relative group"
              onMouseMove={(e) => handleMouseMove(e, false)}
              onMouseLeave={() => resetTilt(false)}
              style={{ 
                transform: `perspective(1000px) rotateX(${missionTilt.x}deg) rotateY(${missionTilt.y}deg)`,
                transition: "transform 0.1s ease"
              }}
            >
              {/* Enhanced gradient border and background */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-red-600/5"></div>
              <div className="absolute -top-2 -right-2 -left-2 h-2 rounded-full bg-gradient-to-r from-amber-500/0 via-amber-500 to-amber-500/0 glass-shimmer"></div>
              
              <CardContent className="p-10 relative z-10">
                <div className="flex items-center mb-10">
                  <div className="p-4 rounded-xl bg-amber-500/15 mr-5 backdrop-blur-lg">
                    <motion.div 
                      whileHover={{ scale: 1.2 }} 
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="relative"
                    >
                      <Lightbulb className="w-7 h-7 text-amber-400" />
                      <div className="absolute inset-0 bg-amber-400/30 blur-lg rounded-full"></div>
                    </motion.div>
                  </div>
                  <h3 className="brutalist-text text-4xl text-white">Our Mission</h3>
                </div>

                <div className="space-y-8 text-gray-300">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    viewport={{ once: true }}
                    className="neo-blur p-6 rounded-xl relative overflow-hidden"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      e.currentTarget.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(245, 158, 11, 0.2), rgba(180, 83, 9, 0.1))`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '';
                    }}
                  >
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-amber-500/20 rounded-full blur-xl"></div>
                    <p className="relative z-10 text-lg leading-relaxed">
                      Lionvest Realty Private. Ltd., our mission is to redefine real
                      estate experience by providing extraordinary service, strategic
                      investment solutions, and unique customer satisfaction. We try to
                      become a reliable partner for homebuyers, investors, and
                      businesses by offering premium residential and commercial
                      properties in Delhi, Noida and Gurgaon.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    viewport={{ once: true }}
                    className="neo-blur p-6 rounded-xl relative overflow-hidden"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      e.currentTarget.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(239, 68, 68, 0.2), rgba(185, 28, 28, 0.1))`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '';
                    }}
                  >
                    <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-red-500/20 rounded-full blur-xl"></div>
                    <p className="relative z-10 text-lg leading-relaxed">
                      With a strong commitment to integrity, innovation and market
                      expertise, we ensure that each property transaction is
                      uninterrupted, safe and rewarding. Our focus is just beyond
                      selling property-our objective is to empower our customers with
                      practical guidance, data-operated strategies and investment
                      opportunities that promote long-term financial growth.
                    </p>
                  </motion.div>
                </div>
                
                {/* Interactive floating indicators */}
                <div className="absolute bottom-6 right-6 flex items-center space-x-2">
                  <motion.div 
                    className="h-1.5 w-1.5 rounded-full bg-amber-400/60"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="h-1.5 w-1.5 rounded-full bg-amber-400/60"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
                  />
                  <motion.div 
                    className="h-1.5 w-1.5 rounded-full bg-amber-400/60"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
                  />
                </div>
                
                {/* Interactive corner decorations */}
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full border border-amber-400/30"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full border border-amber-400/20"></div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        {/* Enhanced decorative element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="flex justify-center mt-20"
        >
          <div className="h-1 w-40 rounded-full glass-shimmer bg-gradient-to-r from-lion-gold/0 via-lion-gold/80 to-lion-gold/0"></div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default VisionMission;
