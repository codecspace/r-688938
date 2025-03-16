
import { Link } from "react-router-dom";
import { projectsData } from "@/data/projectsData";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

const PropertyGrid = () => {
  // Take the first 4 projects for display
  const properties = projectsData.slice(0, 4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {properties.map((property, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -10 }}
          transition={{ duration: 0.4 }}
          className="relative group overflow-hidden rounded-xl shadow-lg"
        >
          <Link to={`/project/${property.id}`} className="block">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={property.heroImage || property.images?.[0] || property.image}
                alt={property.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex gap-2 mb-2">
                {property.isNew && (
                  <Badge variant="outline" className="bg-lion-gold/90 text-white border-none">
                    New
                  </Badge>
                )}
                {property.isFeatured && (
                  <Badge variant="outline" className="bg-black/60 text-white border-none">
                    Featured
                  </Badge>
                )}
              </div>
              
              <h3 className="text-xl font-medium group-hover:text-lion-gold transition-colors mb-2">{property.title}</h3>
              <p className="text-gray-200 mb-3">{property.location}</p>
              
              {property.specifications?.price && (
                <p className="text-lion-gold font-medium text-lg">
                  {property.specifications.price}
                </p>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default PropertyGrid;
