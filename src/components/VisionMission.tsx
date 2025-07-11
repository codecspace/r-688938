
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
      className="py-32 relative overflow-hidden bg-background"
    >

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-sm uppercase tracking-wider text-primary font-medium">Our Philosophy</span>
          
          <h3 className="text-5xl font-display text-foreground mb-6 font-light">
            Vision & Mission
          </h3>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We are committed to creating exceptional real estate experiences that transform lives and communities.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto"
        >
          <motion.div 
            variants={itemVariants} 
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-display text-foreground">Our Vision</h3>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Our vision is to be recognized as a leader in the real estate
                industry, known for our unwavering commitment to quality,
                transparency and customer-centric solutions.
              </p>
              <p>
                We aim to shape the future of real estate by offering investment 
                opportunities and world-class experiences that fulfill the developed 
                aspirations of modern buyers and investors.
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-display text-foreground">Our Mission</h3>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                At Lionvest Realty Private Ltd., our mission is to redefine real
                estate experience by providing extraordinary service, strategic
                investment solutions, and unique customer satisfaction.
              </p>
              <p>
                We focus on empowering our customers with practical guidance, 
                data-operated strategies and investment opportunities that promote 
                long-term financial growth.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default VisionMission;
