
import { MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  id?: string;
  image: string;
  title: string;
  location: string;
  price?: string;
}

const PropertyCard = ({ id, image, title, location, price }: PropertyCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group overflow-hidden rounded-xl shadow-lg h-full bg-white"
    >
      <Link to={id ? `/project/${id}` : "#"} className="block h-full">
        <div className="relative overflow-hidden">
          <div className="aspect-[4/3]">
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
        </div>
        
        <div className="p-6 relative">
          <div className="absolute -top-10 right-6 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300">
            <ArrowUpRight 
              size={18} 
              className="text-lion-gold transform group-hover:scale-110 transition-transform" 
            />
          </div>

          <h3 className="text-xl font-medium group-hover:text-lion-gold transition-colors duration-300 mt-1">{title}</h3>
          
          <div className="flex items-center mt-2 text-gray-500">
            <MapPin size={16} className="mr-2 text-lion-gold" />
            <span className="text-sm">{location}</span>
          </div>
          
          {price && (
            <div className="mt-4 inline-flex px-4 py-1.5 rounded-full bg-gradient-to-r from-lion-gold/10 to-lion-lightgold/10 text-lion-darkgold text-sm font-medium">
              {price}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
