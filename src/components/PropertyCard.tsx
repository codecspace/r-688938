
import { MapPin } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price?: string;
}

const PropertyCard = ({ image, title, location, price }: PropertyCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden group cursor-pointer border-none shadow-lg">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-lg font-medium group-hover:text-lion-gold transition-colors">{title}</h3>
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
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;
