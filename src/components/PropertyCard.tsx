
import { MapPin } from "lucide-react";
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
      className="group overflow-hidden rounded-xl shadow-xl h-full"
    >
      <Link to={id ? `/project/${id}` : "#"} className="block h-full">
        <div className="relative aspect-[3/4] h-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-all duration-500"></div>
          
          {/* Glass effect panel at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-lg bg-black/30 border-t border-white/10">
            <h3 className="text-xl font-medium mb-2 group-hover:text-lion-gold transition-colors duration-300">{title}</h3>
            <div className="flex items-center mt-2 text-gray-200">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{location}</span>
            </div>
            {price && (
              <div className="mt-3 glass-gold text-black font-medium px-4 py-1.5 rounded-full inline-block text-sm">
                {price}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
