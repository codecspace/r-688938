
import { Check } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const OurVision = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const sectionY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
  
  const values = [
    {
      title: "Elevated Living Spaces",
      description: "Creating exceptional living environments that blend luxury with functionality.",
    },
    {
      title: "Sustainable Communities",
      description: "Building eco-conscious developments that respect and enhance their surroundings.",
    },
    {
      title: "Expert Guidance",
      description: "Providing professional expertise and personalized service at every step.",
    },
  ];

  return (
    <motion.section 
      ref={sectionRef} 
      className="py-20 perspective-1000 overflow-hidden"
      style={{
        y: sectionY,
        opacity,
      }}
    >
      <motion.div 
        className="container mx-auto px-4 max-w-6xl text-center"
        style={{
          scale,
          rotateX: rotate,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          {/* Decorative line */}
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-lion-gold to-lion-lightgold mx-auto mb-6 rounded-full"
            initial={{ width: "0%", opacity: 0 }}
            whileInView={{ width: "6rem", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
          
          <h2 className="text-4xl font-display text-lion-black mb-4 gold-text-3d">Our Vision</h2>
          <p className="text-gray-600 mb-12 mx-auto max-w-2xl">
            Our mission is to create innovative, sustainable communities that set new standards.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <motion.div 
              key={index} 
              className="morphism-card p-6 transform-3d"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="w-16 h-16 rounded-full bg-lion-gold/10 flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-8 h-8 text-lion-gold" />
              </motion.div>
              <motion.div 
                className="card-3d-content"
                style={{ transform: "translateZ(20px)" }}
              >
                <h3 className="text-xl font-semibold text-lion-black mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
              
              {/* Decorative blob */}
              <motion.div 
                className="absolute -z-10 opacity-30 w-full h-full top-0 left-0 pointer-events-none"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <motion.path 
                    fill="#D4AF37"
                    d="M44.7,-52.1C58.9,-44.7,72,-30.9,76.4,-14.2C80.8,2.4,76.4,21.9,66.2,35.9C55.9,49.9,39.8,58.5,23.1,63.5C6.4,68.5,-10.9,70,-27.5,65.1C-44.2,60.3,-60.2,49.1,-68.3,33.6C-76.3,18.2,-76.5,-1.6,-69.8,-18.3C-63.2,-35.1,-49.7,-48.7,-35,-54.5C-20.2,-60.3,-4.2,-58.1,10.8,-55.2C25.7,-52.3,51.5,-48.7,44.7,-52.1Z" 
                    animate={{
                      d: [
                        "M44.7,-52.1C58.9,-44.7,72,-30.9,76.4,-14.2C80.8,2.4,76.4,21.9,66.2,35.9C55.9,49.9,39.8,58.5,23.1,63.5C6.4,68.5,-10.9,70,-27.5,65.1C-44.2,60.3,-60.2,49.1,-68.3,33.6C-76.3,18.2,-76.5,-1.6,-69.8,-18.3C-63.2,-35.1,-49.7,-48.7,-35,-54.5C-20.2,-60.3,-4.2,-58.1,10.8,-55.2C25.7,-52.3,51.5,-48.7,44.7,-52.1Z",
                        "M47.9,-45.2C60.8,-35.4,69.5,-17.7,67.2,-2.3C64.8,13,51.3,26.1,38.4,39.1C25.4,52.1,12.7,65.1,-3.9,69C-20.4,72.8,-40.8,67.5,-53.3,54.5C-65.8,41.4,-70.3,20.7,-67.8,2.5C-65.3,-15.8,-55.8,-31.5,-43.2,-41.3C-30.5,-51,-15.3,-54.8,1.2,-55.9C17.7,-57.1,35.1,-55.1,47.9,-45.2Z",
                        "M44.7,-52.1C58.9,-44.7,72,-30.9,76.4,-14.2C80.8,2.4,76.4,21.9,66.2,35.9C55.9,49.9,39.8,58.5,23.1,63.5C6.4,68.5,-10.9,70,-27.5,65.1C-44.2,60.3,-60.2,49.1,-68.3,33.6C-76.3,18.2,-76.5,-1.6,-69.8,-18.3C-63.2,-35.1,-49.7,-48.7,-35,-54.5C-20.2,-60.3,-4.2,-58.1,10.8,-55.2C25.7,-52.3,51.5,-48.7,44.7,-52.1Z"
                      ],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: 10,
                      ease: "easeInOut"
                    }}
                  />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default OurVision;
