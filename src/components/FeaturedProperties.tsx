
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { projectsData } from "@/data/projectsData";
import { MapPin, ArrowUpRight, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

  // Featured/highlighted properties for the carousel
  const highlightedProperties = projectsData.filter(project => project.isFeatured).slice(0, 3);

  return (
    <section id="properties" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h2 
            className="text-sm uppercase tracking-wider mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-lion-gold to-lion-darkgold">featured</span>
          </motion.h2>
          <motion.h3 
            className="text-4xl font-display text-lion-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Explore our exceptional<br/>featured properties
          </motion.h3>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-lion-gold to-lion-darkgold mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>

        {/* Highlighted featured properties carousel */}
        {highlightedProperties.length > 0 && (
          <div className="mb-16">
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {highlightedProperties.map((property) => (
                  <CarouselItem key={property.id}>
                    <motion.div 
                      className="relative rounded-2xl overflow-hidden aspect-[16/9]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img 
                        src={property.heroImage || property.image} 
                        alt={property.propertyName} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <Badge className="mb-3 bg-lion-gold hover:bg-lion-darkgold border-none">Featured</Badge>
                        <h4 className="text-3xl font-display font-medium text-white mb-2">{property.propertyName}</h4>
                        <div className="flex items-center text-white/80 mb-4">
                          <MapPin size={16} className="mr-2" />
                          <span>{property.location}</span>
                        </div>
                        <Link to={`/project/${property.id}`}>
                          <motion.button
                            className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg border border-white/20 hover:bg-lion-gold hover:border-lion-gold hover:text-white transition-colors duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            View Details
                          </motion.button>
                        </Link>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-white/20 backdrop-blur-md text-white border-white/10 hover:bg-lion-gold hover:text-white" />
              <CarouselNext className="right-4 bg-white/20 backdrop-blur-md text-white border-white/10 hover:bg-lion-gold hover:text-white" />
            </Carousel>
          </div>
        )}

        {/* Regular property grid */}
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
              className="group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to={`/project/${property.id}`} className="block">
                <div className="relative overflow-hidden rounded-t-xl">
                  <div className="absolute top-3 left-3 z-20 flex gap-2">
                    {property.isNew && (
                      <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-none py-1 shadow-md">
                        New
                      </Badge>
                    )}
                    {property.isFeatured && (
                      <Badge className="bg-gradient-to-r from-lion-gold to-lion-darkgold hover:from-lion-darkgold hover:to-lion-gold text-white border-none py-1 shadow-md flex items-center gap-1">
                        <Star size={12} className="fill-white" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <div className="aspect-[4/3]">
                    <motion.img 
                      src={property.heroImage || property.images?.[0] || property.image} 
                      alt={property.propertyName} 
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                  </div>
                </div>
                
                <div className="p-6 bg-white flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-xl font-medium text-lion-black group-hover:text-lion-gold transition-colors duration-300">
                        {property.propertyName}
                      </h4>
                      
                      <motion.div 
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                        whileHover={{ 
                          scale: 1.1, 
                          backgroundColor: "#D4AF37",
                          color: "white" 
                        }}
                      >
                        <ArrowUpRight size={14} />
                      </motion.div>
                    </div>
                    
                    <div className="flex items-center mt-2 text-gray-500">
                      <MapPin size={14} className="mr-1" />
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
              className="px-8 py-3 bg-gradient-to-r from-lion-gold to-lion-darkgold hover:from-lion-darkgold hover:to-lion-gold text-black font-medium rounded shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
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
