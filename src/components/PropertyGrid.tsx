
import PropertyCard from "./PropertyCard";
import { projectsData } from "@/data/projectsData";

const PropertyGrid = () => {
  // Take the first 4 projects for display
  const properties = projectsData.slice(0, 4).map(project => ({
    id: project.id,  // Add ID for linking
    image: project.heroImage || project.image,  // Use heroImage as primary image
    title: project.title,
    location: project.location,
    price: project.specifications?.price || "Contact for price",
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
      {properties.map((property, index) => (
        <PropertyCard key={index} {...property} />
      ))}
    </div>
  );
};

export default PropertyGrid;
