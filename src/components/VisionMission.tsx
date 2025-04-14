
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Book, Target, Sparkles, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const VisionMission = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacitySection = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scaleSection = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // 3D card tilt effect
  const cardTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const resetCardTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <motion.section 
      ref={containerRef}
      style={{ opacity: opacitySection, scale: scaleSection }}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-lion-black to-zinc-900"
    >
      {/* Dynamic background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-purple-500/30 filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-40 right-[15%] w-80 h-80 rounded-full bg-blue-500/20 filter blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating neon lines */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="absolute h-px bg-gradient-to-r from-transparent via-lion-gold/40 to-transparent w-full"
              style={{
                top: `${15 + i * 20}%`,
                left: 0,
                opacity: 0.3,
                transform: `rotate(${i % 2 ? 0.5 : -0.5}deg)`,
                animation: `floatAnimation ${3 + i * 0.5}s infinite ease-in-out`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-lion-gold" />
            <h2 className="text-sm uppercase tracking-wider text-lion-gold">Our Philosophy</h2>
          </div>
          
          <h3 className="text-4xl font-display text-white mb-6">
            <span className="relative inline-block">
              Vision
              <div className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-lion-gold/0 via-lion-gold to-lion-gold/0"></div>
            </span>{" "}
            &{" "}
            <span className="relative inline-block">
              Mission
              <div className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-lion-gold/0 via-lion-gold to-lion-gold/0"></div>
            </span>
          </h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16"
        >
          {/* Vision Card */}
          <motion.div variants={itemVariants} className="h-full" whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
            <Card 
              className="glass-depth-dark h-full overflow-hidden relative group card-3d"
              onMouseMove={cardTilt}
              onMouseLeave={resetCardTilt}
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/5"></div>
              <div className="absolute -top-2 -right-2 -left-2 h-2 rounded-full bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0 glass-shimmer"></div>
              
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center mb-8">
                  <div className="p-3 rounded-xl bg-blue-500/10 mr-4 backdrop-blur-sm">
                    <motion.div 
                      whileHover={{ rotate: 360 }} 
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      <Target className="w-6 h-6 text-blue-400" />
                    </motion.div>
                  </div>
                  <h3 className="brutalist-text text-3xl text-white">Our Vision</h3>
                </div>

                <div className="space-y-6 text-gray-300">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="neo-blur p-5 rounded-xl relative overflow-hidden"
                  >
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
                    <p className="relative z-10">
                      Our vision is to be recognized as a leader in the real estate
                      industry, known for our unwavering commitment to quality,
                      transparency and customer-centric solutions. We aim to shape the
                      future of real estate by offering investment opportunities and
                      world-class experiences that fulfill the developed aspirations of
                      modern buyers and investors.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="neo-blur p-5 rounded-xl relative overflow-hidden"
                  >
                    <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"></div>
                    <p className="relative z-10">
                      We expand their presence in the major residential and commercial
                      hubs, establishing new benchmarks in luxury, stability and
                      investment security. Through our expertise, we want to build a
                      real estate ecosystem, where each customer finds the right
                      assets, whether for residential enjoyment or commercial
                      prosperity.
                    </p>
                  </motion.div>
                </div>
                
                {/* Floating indicators */}
                <div className="absolute bottom-4 right-4 flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-1 w-1 rounded-full bg-blue-400/60"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mission Card */}
          <motion.div variants={itemVariants} className="h-full" whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
            <Card 
              className="glass-depth-dark h-full overflow-hidden relative group card-3d"
              onMouseMove={cardTilt}
              onMouseLeave={resetCardTilt}
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-red-600/5"></div>
              <div className="absolute -top-2 -right-2 -left-2 h-2 rounded-full bg-gradient-to-r from-amber-500/0 via-amber-500 to-amber-500/0 glass-shimmer"></div>
              
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center mb-8">
                  <div className="p-3 rounded-xl bg-amber-500/10 mr-4 backdrop-blur-sm">
                    <motion.div 
                      whileHover={{ scale: 1.2 }} 
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <Lightbulb className="w-6 h-6 text-amber-400" />
                    </motion.div>
                  </div>
                  <h3 className="brutalist-text text-3xl text-white">Our Mission</h3>
                </div>

                <div className="space-y-6 text-gray-300">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="neo-blur p-5 rounded-xl relative overflow-hidden"
                  >
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-amber-500/10 rounded-full blur-xl"></div>
                    <p className="relative z-10">
                      Lionvest Realty Private. Ltd., our mission is to redefine real
                      estate experience by providing extraordinary service, strategic
                      investment solutions, and unique customer satisfaction. We try to
                      become a reliable partner for homebuyers, investors, and
                      businesses by offering premium residential and commercial
                      properties in Delhi, Noida and Gurgaon.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="neo-blur p-5 rounded-xl relative overflow-hidden"
                  >
                    <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-red-500/10 rounded-full blur-xl"></div>
                    <p className="relative z-10">
                      With a strong commitment to integrity, innovation and market
                      expertise, we ensure that each property transaction is
                      uninterrupted, safe and rewarding. Our focus is just beyond
                      selling property-our objective is to empower our customers with
                      practical guidance, data-operated strategies and investment
                      opportunities that promote long-term financial growth.
                    </p>
                  </motion.div>
                </div>
                
                {/* Floating indicators */}
                <div className="absolute bottom-4 right-4 flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-1 w-1 rounded-full bg-amber-400/60"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        {/* Decorative element */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="flex justify-center mt-16"
        >
          <div className="h-1 w-24 bg-gradient-to-r from-lion-gold/0 via-lion-gold to-lion-gold/0"></div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default VisionMission;
