
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { projectsData } from "@/data/projectsData";
import { MapPin } from "lucide-react";
import { Reveal, RevealMask } from "@/components/layout/Reveal";
import ImageWithFallback from "@/components/layout/ImageWithFallback";
import TiltCard from "@/components/layout/TiltCard";

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
    <section id="properties" className="py-24 md:py-32 bg-lion-ivory">
      <div className="container mx-auto px-4 max-w-6xl">
        <Reveal className="text-center mb-16">
          <span className="eyebrow justify-center mb-3">Featured</span>
          <h3 className="font-display text-4xl md:text-6xl text-lion-black mb-4 leading-[1.05] tracking-tight">
            <RevealMask>Properties worth a second look</RevealMask>
          </h3>
          <motion.div 
            className="w-16 h-px bg-lion-gold mx-auto mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </Reveal>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projectsData.map((property) => (
            <motion.div key={property.id} variants={itemVariants}>
              <TiltCard
                maxTilt={6}
                className="group cursor-pointer backdrop-blur-sm bg-white/50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
              <Link to={`/project/${property.id}`}>
                <div className="relative overflow-hidden rounded-t-xl h-[280px]">
                  <div className="absolute top-3 left-3 z-20 flex gap-2">
                    {property.isNew && (
                      <Badge className="bg-lion-black/90 backdrop-blur-sm text-lion-gold border border-lion-gold/40 py-1 shadow-md">
                        New Offer
                      </Badge>
                    )}
                    {property.isFeatured && (
                      <Badge className="bg-gradient-to-r from-lion-gold to-lion-darkgold text-lion-black border-none py-1 shadow-md font-medium">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <div className="bg-gradient-to-t from-lion-black to-transparent absolute inset-0 z-10 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                  <ImageWithFallback
                    src={property.heroImage || property.images?.[0] || property.image}
                    alt={property.propertyName}
                    fallbackLabel={property.propertyName}
                    width={520}
                    height={280}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white backdrop-blur-sm bg-black/20">
                    <h4 className="text-xl font-semibold mb-1 group-hover:text-lion-gold transition-colors duration-300">{property.propertyName}</h4>
                    <div className="flex items-center mt-1 text-gray-200">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
