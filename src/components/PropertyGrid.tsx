
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {properties.map((property, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative overflow-hidden rounded-xl shadow-xl"
          >
            <Link to={`/project/${property.id}`}>
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-medium group-hover:text-lion-gold transition-colors">{property.title}</h3>
                <div className="flex items-center mt-2 text-gray-200">
                  <span className="text-sm">{property.location}</span>
                </div>
                {property.price && (
                  <div className="mt-3 bg-lion-gold/90 text-black font-medium px-4 py-1.5 rounded-full inline-block text-sm">
                    {property.price}
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;
