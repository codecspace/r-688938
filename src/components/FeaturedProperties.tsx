
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";

const properties = [
  {
    id: 1,
    title: "AIPL Joy District Sector 88 Gurgaon",
    location: "Sector - 63A, Gurugram, Gurugram",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    isNew: true,
    isFeatured: true
  },
  {
    id: 2,
    title: "Godrej Aristocrat Gurgaon",
    location: "Sector - 63A, Gurugram, Gurugram",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    isNew: true,
    isFeatured: true
  },
  {
    id: 3,
    title: "HERO HOMES Sector – 104, Gurugram",
    location: "Sector - 63A, Gurugram, Gurugram",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    isNew: true,
    isFeatured: true
  },
  {
    id: 4,
    title: "AIPL Joy Square Sector 63A, Gurgaon",
    location: "Sector - 63A, Gurugram, Gurugram",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    isNew: true,
    isFeatured: true
  },
  {
    id: 5,
    title: "Birla Arika Sector 31, Gurgaon",
    location: "Sector 31, Gurgaon, Gurugram",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
    isNew: false,
    isFeatured: true
  },
  {
    id: 6,
    title: "Tarc Ishva – Sector – 63A, Gurugram",
    location: "Sector - 63A, Gurugram, Gurugram",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    isNew: false,
    isFeatured: true
  }
];

const FeaturedProperties = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wider text-lion-gold mb-2">featured</h2>
          <h3 className="text-4xl font-display text-lion-black mb-4">
            Explore the featured properties in<br/>our list to find your perfect home
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <div className="absolute top-3 left-3 z-20 flex gap-2">
                  {property.isNew && (
                    <Badge className="bg-lion-gold text-black border-none">
                      new offer
                    </Badge>
                  )}
                  {property.isFeatured && (
                    <Badge className="bg-white text-lion-black border-none">
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="bg-gradient-to-t from-lion-black to-transparent absolute inset-0 z-10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                  <h4 className="text-xl font-semibold mb-1 group-hover:text-lion-gold transition-colors duration-300">{property.title}</h4>
                  <p className="text-gray-300 text-sm">{property.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-lion-gold hover:bg-lion-darkgold text-black font-medium rounded transition-colors">
            Load More Listings
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
