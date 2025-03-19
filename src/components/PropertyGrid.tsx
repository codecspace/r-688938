
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projectsData } from "@/data/projectsData";

const PropertyGrid = () => {
  // Take the first 4 projects for display
  const properties = projectsData.slice(0, 4).map(project => ({
    id: project.id,
    image: project.heroImage || project.image,
    title: project.propertyName,  // Keep using propertyName for the internal object mapping
    location: project.location,
    description: project.description,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      {properties.map((property, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-6 flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-auto rounded-lg object-contain"
              />
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              <h3 className="text-2xl font-medium text-lion-black">{property.title}</h3>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PropertyGrid;
