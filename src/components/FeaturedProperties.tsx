
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { projectsData } from "@/data/projectsData";
import { MapPin } from "lucide-react";

const FeaturedProperties = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="properties" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-sm uppercase tracking-wider text-lion-gold mb-2">featured</h2>
          <h3 className="text-4xl font-display text-lion-black mb-4">
            Explore the featured properties in<br/>our list to find your perfect home
          </h3>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projectsData.map((property) => (
            <motion.div
              key={property.id}
              variants={itemVariants}
              className="group"
            >
              <Link to={`/project/${property.id}`}>
                <div className="relative overflow-hidden rounded-xl shadow-lg h-[300px]">
                  <div className="absolute top-3 left-3 z-20 flex gap-2">
                    {property.isNew && (
                      <Badge className="bg-purple-600 hover:bg-purple-700 text-white border-none py-1">
                        New Offer
                      </Badge>
                    )}
                    {property.isFeatured && (
                      <Badge className="bg-green-500 hover:bg-green-600 text-white border-none py-1">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <motion.img 
                    src={property.heroImage || property.image} 
                    alt={property.title} 
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="bg-gradient-to-t from-lion-black to-transparent absolute inset-0 z-10 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                    <h4 className="text-xl font-semibold mb-1 group-hover:text-lion-gold transition-colors duration-300">{property.title}</h4>
                    <div className="flex items-center mt-1 text-gray-200">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link to="/projects">
            <motion.button 
              className="px-8 py-3 bg-lion-gold hover:bg-lion-darkgold text-black font-medium rounded transition-colors shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              View All Properties
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
