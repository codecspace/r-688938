
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projectsData } from "@/data/projectsData";
import { Skeleton } from "@/components/ui/skeleton";
import MagneticButton from "@/components/MagneticButton";
import { useState } from "react";

const PropertyGrid = () => {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  
  // Take the first 4 projects for display
  const properties = projectsData.slice(0, 4).map(project => ({
    id: project.id,
    image: project.heroImage || project.image,
    title: project.propertyName,
    location: project.location,
    description: project.description,
  }));

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-12">
      {properties.map((property, index) => (
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
          <div className="p-8 flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/3 overflow-hidden rounded-lg relative">
              <Link to={`/project/${property.id}`}>
                {!loadedImages[index] && (
                  <div className="absolute inset-0 z-10">
                    <Skeleton className="w-full h-full" />
                  </div>
                )}
                <motion.img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-auto rounded-lg object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  style={{ opacity: loadedImages[index] ? 1 : 0 }}
                  onLoad={() => handleImageLoad(index)}
                />
              </Link>
              
              {/* Dynamic gradient overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br opacity-20 rounded-lg"
                style={{
                  background: `linear-gradient(135deg, rgba(212,175,55,0.3) 0%, rgba(245,215,110,0.1) 100%)`,
                }}
                animate={{
                  background: [
                    `linear-gradient(135deg, rgba(212,175,55,0.3) 0%, rgba(245,215,110,0.1) 100%)`,
                    `linear-gradient(225deg, rgba(212,175,55,0.3) 0%, rgba(245,215,110,0.1) 100%)`,
                    `linear-gradient(315deg, rgba(212,175,55,0.3) 0%, rgba(245,215,110,0.1) 100%)`,
                    `linear-gradient(45deg, rgba(212,175,55,0.3) 0%, rgba(245,215,110,0.1) 100%)`
                  ]
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              <Link to={`/project/${property.id}`}>
                <motion.h3 
                  className="text-2xl font-medium text-lion-black hover-highlight inline-block"
                  whileHover={{ color: "#D4AF37" }}
                  transition={{ duration: 0.3 }}
                >
                  {property.title}
                </motion.h3>
              </Link>
              <div className="h-1 w-16 bg-gradient-to-r from-lion-gold to-lion-lightgold rounded-full"></div>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
              
              <MagneticButton strength={20}>
                <Link to={`/project/${property.id}`}>
                  <motion.button 
                    className="mt-4 px-6 py-2 bg-white text-lion-black rounded-lg border border-lion-gold/30 shadow-sm btn-glow overflow-hidden relative"
                    whileHover={{ 
                      backgroundColor: "#D4AF37",
                      color: "#fff",
                      scale: 1.02
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="relative z-10">View Property</span>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-lion-gold/20 via-lion-gold/10 to-transparent"
                      animate={{ 
                        x: ["0%", "100%"],
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                      }}
                    />
                  </motion.button>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PropertyGrid;
