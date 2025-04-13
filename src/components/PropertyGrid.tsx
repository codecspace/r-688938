
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";
import { projectsData } from "@/data/projectsData";
import { Card, CardContent } from "./ui/card";

const PropertyGrid = () => {
  // Take the first 4 projects for display
  const properties = projectsData.slice(0, 4).map(project => ({
    id: project.id,
    image: project.heroImage || project.image,
    title: project.propertyName,  // Keep using propertyName for the internal object mapping
    location: project.location,
    description: project.description,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-12">
      {properties.map((property, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 relative overflow-hidden">
                  <Link to={`/project/${property.id}`}>
                    <div className="relative aspect-square md:aspect-auto md:h-full overflow-hidden">
                      <motion.div 
                        className="w-full h-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      >
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70"></div>
                    </div>
                  </Link>
                </div>
                
                <div className="w-full md:w-3/5 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/project/${property.id}`}>
                          <motion.h3 
                            className="text-2xl font-medium text-lion-black group"
                            whileHover={{ color: "#D4AF37" }}
                            transition={{ duration: 0.3 }}
                          >
                            {property.title}
                          </motion.h3>
                        </Link>
                        <div className="flex items-center mt-2 text-gray-500">
                          <MapPin size={16} className="mr-1 text-lion-gold" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                      </div>
                      <Link to={`/project/${property.id}`}>
                        <motion.div 
                          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                          whileHover={{ 
                            scale: 1.1, 
                            backgroundColor: "#D4AF37",
                            color: "white" 
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowUpRight size={16} />
                        </motion.div>
                      </Link>
                    </div>
                    
                    <div className="h-0.5 w-16 bg-gradient-to-r from-lion-gold to-lion-lightgold rounded-full my-4"></div>
                    
                    <p className="text-gray-600 leading-relaxed line-clamp-3 mb-6">
                      {property.description}
                    </p>
                  </div>
                  
                  <Link to={`/project/${property.id}`}>
                    <motion.button 
                      className="px-6 py-2.5 bg-white text-lion-black rounded-lg border border-lion-gold/30 shadow-sm btn-glow overflow-hidden relative"
                      whileHover={{ 
                        backgroundColor: "#D4AF37",
                        color: "#fff",
                        scale: 1.02
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      Explore Property
                    </motion.button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default PropertyGrid;
