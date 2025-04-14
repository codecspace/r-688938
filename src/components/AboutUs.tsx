
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { useRef } from "react";

const AboutUs = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Content animations
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  const contentRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);
  
  // Image animations
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const imageRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-8, 0, 8]);
  const imageRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -4]);
  const imageZ = useTransform(scrollYProgress, [0, 0.5, 1], [-50, 0, 50]);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-white overflow-hidden perspective-1000">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={contentRef}
            style={{
              y: contentY,
              opacity: contentOpacity,
              rotateX: contentRotate,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "5rem" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-1 bg-gradient-to-r from-lion-gold to-lion-lightgold rounded-full"
              />
              
              <h2 className="text-sm uppercase tracking-wider text-lion-gold mb-2">About us</h2>
              <h3 className="text-4xl font-display text-lion-black mb-6">About Lionvest Realty</h3>
              
              <div className="space-y-4 text-gray-700">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  At Lionvest Realty Pvt. Ltd., We are committed to providing seamless and expert real estate solutions for residential and commercial property buyers in Delhi, Noida and Gurgaon. With a vision to simplify property transactions, we provide strategic guidance and unmatched support to help you make informed investment decisions.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Our name, "Lionvest" is more than just one brand, it is a symbol of the strength, confidence and reliability that brings into the real estate market. The lion symbol:
                </motion.p>
                <motion.ul 
                  className="list-disc pl-5 space-y-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {[
                    { title: "Strength and power:", text: "Performing our dominance and leadership in the real estate industry." },
                    { title: "Courage and belief:", text: "to empower customers with bold, well informed investment options." },
                    { title: "Authority and reputation:", text: "establishing faith through reliability, expertise and excellence." },
                    { title: "Protection and reliability:", text: "to ensure safe and transparent property transactions." }
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                      viewport={{ once: true }}
                    >
                      <span className="font-semibold">{item.title}</span> {item.text}
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  With a client-first approach, we are proud to give real estate solutions supported by deep market insight and unwavering integrity. Whether you are looking for your dream house or a strategic commercial investment, Lionvest Realty Private. Limited Dynamic is your reliable partner in navigating the real estate landscape.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <Button className="mt-6 bg-lion-gold hover:bg-lion-darkgold text-black">
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative perspective-800"
            ref={imageRef}
            style={{
              scale: imageScale,
              rotateY: imageRotateY,
              rotateX: imageRotateX,
              z: imageZ,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Decorative background element */}
            <motion.div 
              className="absolute -top-4 -left-4 w-64 h-64 bg-lion-gold/20 rounded-lg"
              animate={{ 
                rotate: [-1, 1, -1],
                scale: [1, 1.02, 1],
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                repeatType: "mirror"
              }}
            />
            
            {/* Main image with floating animation */}
            <motion.div
              className="relative z-10"
              animate={{
                y: [-5, 5, -5],
                rotateY: [-1, 1, -1],
                rotateX: [1, -1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
                alt="Modern building"
                className="w-full h-[500px] object-cover rounded-lg shadow-xl relative z-10"
              />
              
              {/* Glass reflection effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-lg z-20"
                animate={{
                  backgroundPosition: ["200% 0%", "-100% 100%", "200% 0%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -bottom-6 -right-6 w-48 h-48 bg-gray-100/30 rounded-lg transform rotate-6"
              animate={{ 
                rotate: [6, 8, 6],
                scale: [1, 0.98, 1],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "mirror"
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
