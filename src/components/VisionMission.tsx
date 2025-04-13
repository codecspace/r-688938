
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const VisionMission = () => {
  // References for scroll-based animations
  const sectionRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  
  // Main section scroll tracking
  const { scrollYProgress: sectionScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Transform values based on scroll position
  const sectionOpacity = useTransform(sectionScrollProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const sectionY = useTransform(sectionScrollProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const sectionRotateX = useTransform(sectionScrollProgress, [0, 0.2, 0.8, 1], [10, 0, 0, -10]);
  
  // Vision card scroll tracking
  const { scrollYProgress: visionScrollProgress } = useScroll({
    target: visionRef,
    offset: ["start end", "end start"],
  });
  
  const visionRotate = useTransform(visionScrollProgress, [0, 0.5, 1], [-5, 0, 5]);
  const visionScale = useTransform(visionScrollProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
  const visionZ = useTransform(visionScrollProgress, [0, 0.5, 1], [-50, 0, -30]);
  
  // Mission card scroll tracking
  const { scrollYProgress: missionScrollProgress } = useScroll({
    target: missionRef,
    offset: ["start end", "end start"],
  });
  
  const missionRotate = useTransform(missionScrollProgress, [0, 0.5, 1], [5, 0, -5]);
  const missionScale = useTransform(missionScrollProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
  const missionZ = useTransform(missionScrollProgress, [0, 0.5, 1], [-50, 0, -30]);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="py-20 bg-lion-black min-h-screen flex items-center perspective-1000"
      style={{ 
        opacity: sectionOpacity,
        y: sectionY,
        rotateX: sectionRotateX,
      }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-sm uppercase tracking-wider text-lion-gold mb-2">Our Philosophy</h2>
          <h3 className="text-4xl font-display text-white mb-4">Vision & Mission</h3>
          
          {/* 3D underline effect */}
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-lion-gold to-lion-lightgold mx-auto mt-2 rounded-full"
            animate={{
              width: ["4rem", "6rem", "4rem"],
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision Card with 3D effects */}
          <motion.div
            ref={visionRef}
            className="vision-card relative bg-gradient-to-br from-white/5 to-white/15 backdrop-blur-md p-8 rounded-xl shadow-lg border-t-2 border-l-2 border-white/20 hover:shadow-2xl transition-all duration-300 overflow-hidden"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{
              rotateY: visionRotate,
              scale: visionScale,
              z: visionZ,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-lion-gold/10 blur-2xl"
              animate={{ 
                rotate: [0, 360],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="relative z-10">
              <motion.h3 
                className="text-3xl font-display mb-6 flex items-center text-white"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.span 
                  className="text-lion-gold mr-2"
                  animate={{ 
                    textShadow: ["0 0 0px rgba(212, 175, 55, 0)", "0 0 10px rgba(212, 175, 55, 0.5)", "0 0 0px rgba(212, 175, 55, 0)"]
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                >
                  Our Vision
                </motion.span>
              </motion.h3>
              <div className="space-y-4 text-gray-300">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Our vision is to be recognized as a leader in the real estate
                  industry, known for our unwavering commitment to quality,
                  transparency and customer-centric solutions. We aim to shape the
                  future of real estate by offering investment opportunities and
                  world-class experiences that fulfill the developed aspirations of
                  modern buyers and investors.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  We expand their presence in the major residential and commercial
                  hubs, establishing new benchmarks in luxury, stability and
                  investment security. Through our expertise, we want to build a
                  real estate ecosystem, where each customer finds the right
                  assets, whether for residential enjoyment or commercial
                  prosperity.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  At Lionvest Realty Pvt. Ltd., we believe in creating value beyond
                  transactions we are building relationships, trust, and a future
                  where real estate investments are simplified, secure, and
                  strategically sound.
                </motion.p>
              </div>
            </div>

            {/* Decorative corner shape */}
            <div className="absolute -bottom-10 -left-10 w-20 h-20 rotate-45 bg-lion-gold/5 rounded-md" />
          </motion.div>

          {/* Mission Card with 3D effects */}
          <motion.div
            ref={missionRef}
            className="mission-card relative bg-gradient-to-br from-white/5 to-white/15 backdrop-blur-md p-8 rounded-xl shadow-lg border-t-2 border-l-2 border-white/20 hover:shadow-2xl transition-all duration-300 overflow-hidden"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{
              rotateY: missionRotate,
              scale: missionScale,
              z: missionZ,
              transformStyle: "preserve-3d",
            }}
            transition={{ delay: 0.2 }}
          >
            {/* Decorative elements */}
            <motion.div 
              className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-lion-gold/10 blur-2xl"
              animate={{ 
                rotate: [0, -360],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="relative z-10">
              <motion.h3 
                className="text-3xl font-display mb-6 flex items-center text-white"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.span 
                  className="text-lion-gold mr-2"
                  animate={{ 
                    textShadow: ["0 0 0px rgba(212, 175, 55, 0)", "0 0 10px rgba(212, 175, 55, 0.5)", "0 0 0px rgba(212, 175, 55, 0)"]
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                >
                  Our Mission
                </motion.span>
              </motion.h3>
              <div className="space-y-4 text-gray-300">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Lionvest Realty Private. Ltd., our mission is to redefine real
                  estate experience by providing extraordinary service, strategic
                  investment solutions, and unique customer satisfaction. We try to
                  become a reliable partner for homebuyers, investors, and
                  businesses by offering premium residential and commercial
                  properties in Delhi, Noida and Gurgaon.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  With a strong commitment to integrity, innovation and market
                  expertise, we ensure that each property transaction is
                  uninterrupted, safe and rewarding. Our focus is just beyond
                  selling property-our objective is to empower our customers with
                  practical guidance, data-operated strategies and investment
                  opportunities that promote long-term financial growth.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  By embracing state-of-the-art technology and industry, we are
                  constantly developing to meet the dynamic needs of our
                  customers. Whether it is a luxury residence, high-value
                  commercial place, or strategic real estate investment, Lionvest
                  Realty Private. Ltd. is dedicated to creation of excellence,
                  trust and success in the real estate sector.
                </motion.p>
              </div>
            </div>

            {/* Decorative corner shape */}
            <div className="absolute -top-10 -right-10 w-20 h-20 rotate-45 bg-lion-gold/5 rounded-md" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default VisionMission;
