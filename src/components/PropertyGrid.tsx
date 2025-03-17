
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { projectsData } from "@/data/projectsData";

const PropertyGrid = () => {
  // Take the first 4 projects for display
  const properties = projectsData.slice(0, 4).map(project => ({
    id: project.id,
    image: project.heroImage || project.image,
    title: project.title,
    location: project.location,
    price: project.specifications?.price || "Contact for price",
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {properties.map((property, index) => (
        <Link to={`/project/${property.id}`} key={index}>
          <motion.div
            className="relative overflow-hidden rounded-xl shadow-lg h-[300px] group"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-medium group-hover:text-lion-gold transition-colors">{property.title}</h3>
              <div className="flex items-center mt-2 text-gray-200">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.location}</span>
              </div>
              {property.price && (
                <div className="mt-2 text-lion-gold font-medium">
                  {property.price}
                </div>
              )}
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default PropertyGrid;
