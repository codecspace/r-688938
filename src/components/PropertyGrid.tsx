
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projectsData } from "@/data/projectsData";
import PropertyCard from "./PropertyCard";

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
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {properties.map((property, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <PropertyCard {...property} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;
