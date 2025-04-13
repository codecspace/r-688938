
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projectsData } from "@/data/projectsData";
import { useState, useEffect, useRef } from "react";
import { Skeleton } from "./ui/skeleton";

const PropertyGrid = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      // Take the first 4 projects for display
      const propertiesData = projectsData.slice(0, 4).map(project => ({
        id: project.id,
        image: project.heroImage || project.image,
        title: project.propertyName,
        location: project.location,
        description: project.description,
      }));
      
      setProperties(propertiesData);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Staggered animation for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="max-w-6xl mx-auto px-4 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {loading ? (
        // Skeleton loaders
        Array(4).fill(0).map((_, index) => (
          <div key={`skeleton-${index}`} className="glass-depth rounded-xl overflow-hidden p-8">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <Skeleton className="w-full md:w-1/3 h-64 rounded-lg" />
              <div className="w-full md:w-2/3 space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-1 w-16" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-36 mt-4" />
              </div>
            </div>
          </div>
        ))
      ) : (
        properties.map((property, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="glass-depth rounded-xl overflow-hidden transform-gpu"
            whileHover={{ 
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
            }}
          >
            <div className="p-8 flex flex-col md:flex-row items-center gap-10 relative">
              {/* Dynamic blob background */}
              <div className="absolute -left-20 -bottom-20 w-64 h-64 z-0 opacity-10 pointer-events-none">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <motion.path 
                    fill="#D4AF37"
                    initial={{ d: "M44.7,-52.1C58.9,-44.7,72,-30.9,76.4,-14.2C80.8,2.4,76.4,21.9,66.2,35.9C55.9,49.9,39.8,58.5,23.1,63.5C6.4,68.5,-10.9,70,-27.5,65.1C-44.2,60.3,-60.2,49.1,-68.3,33.6C-76.3,18.2,-76.5,-1.6,-69.8,-18.3C-63.2,-35.1,-49.7,-48.7,-35,-54.5C-20.2,-60.3,-4.2,-58.1,10.8,-55.2C25.7,-52.3,51.5,-48.7,44.7,-52.1Z" }}
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
              </div>
              
              <div className="w-full md:w-1/3 overflow-hidden rounded-lg z-10">
                <Link to={`/project/${property.id}`}>
                  <motion.img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-auto rounded-lg object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                </Link>
              </div>
              <div className="w-full md:w-2/3 space-y-4 z-10">
                <Link to={`/project/${property.id}`}>
                  <motion.h3 
                    className="text-2xl font-medium text-lion-black"
                    whileHover={{ color: "#D4AF37" }}
                    transition={{ duration: 0.3 }}
                  >
                    {property.title}
                  </motion.h3>
                </Link>
                <motion.div 
                  className="h-1 w-16 bg-gradient-to-r from-lion-gold to-lion-lightgold rounded-full"
                  animate={{
                    width: ["4rem", "5rem", "4rem"],
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                ></motion.div>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
                
                <Link to={`/project/${property.id}`}>
                  <MagneticButton>View Property</MagneticButton>
                </Link>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

// Magnetic Button Component
const MagneticButton = ({ children }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // Scale movement based on distance
    setPosition({ x: x * 0.1, y: y * 0.1 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className="relative inline-block"
      whileHover={{ scale: 1.05 }}
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
    >
      <motion.button 
        className="mt-4 px-6 py-2 bg-white text-lion-black rounded-lg border border-lion-gold/30 shadow-sm btn-glow overflow-hidden relative"
        whileHover={{ 
          backgroundColor: "#D4AF37",
          color: "#fff"
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.button>
    </motion.div>
  );
};

export default PropertyGrid;
