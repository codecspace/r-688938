
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
  const content = (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-xl shadow-lg h-[300px] group cursor-pointer"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl font-medium group-hover:text-lion-gold transition-colors">{title}</h3>
        <div className="flex items-center mt-2 text-gray-200">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        {price && (
          <div className="mt-2 text-lion-gold font-medium">
            {price}
          </div>
        )}
      </div>
    </motion.div>
  );

  if (id) {
    return <Link to={`/project/${id}`}>{content}</Link>;
  }

  return content;
};

export default PropertyCard;
