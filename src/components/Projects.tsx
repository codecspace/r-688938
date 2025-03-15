
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

const projectData = [
  {
    id: 1,
    title: "TARC Ishva",
    image: "https://imgur.com/YQSL3gr.jpg",
    description: "TARC Ishva provides 3 and 4 BHK residences starting from 2850 square feet. These houses mix contemporary elegance with a huge layout, making them an ideal choice for those who appreciate the sophisticated life."
  },
  {
    id: 2,
    title: "Birla Arika",
    image: "https://imgur.com/VIVNtTM.jpg",
    description: "Birla Arika Super-Paljari 4 bhk + staff residences are designed for those who desire grandeur. With 4200 – 4900 square feet to extended size, these houses offer a unique lifestyle of specificity and elegance set within a reputed and cool enclave."
  },
  {
    id: 3,
    title: "Godrej Aristocrat",
    image: "https://imgur.com/Tm5t9pp.jpg",
    description: "Located in Sector 49, the Golf Course presents an artistic and huge 3 and 4 BHK apartments with the extension roads, Gurugram, Godrej Aristocrat Utility areas. This work of craftsmanship has a triple-hit entrance lobby, an 18-hole golf course, landscaped terrace, a swimming pool, a luxury clubhouse, and more-which reduces the lifestyle of sophistication and indulgence."
  },
  {
    id: 4,
    title: "HERO HOMES Sector 104",
    image: "https://imgur.com/1qjWa6d.jpg",
    description: "Sector 104, settled in Sector 104, is a premium residential project by Gurgaon, Hero Realty, extending with five high-growing towers in 11 acres. While offering 3 and 4 BHK apartments, this development is designed for modern urban families and professionals, which basically combines luxury and convenience in a rich place."
  },
  {
    id: 5,
    title: "AIPL Joy Square & District",
    image: "https://imgur.com/V3ZYKie.jpg",
    description: "AIPL Joy Square (Sector 62A) and AIPL Joy District (Sector 88) redefine commercial excellence with double-hit faces for branding, expander basements, dedicated escalators and lifts and lifts and a reputed ski garden at LID B level. These projects provide a perfect environment for retail, F&B and corporate development, making them a major investment site."
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wider text-lion-gold mb-2">Developers</h2>
          <h3 className="text-4xl font-display text-lion-black">Our Projects</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64">
                  <Badge className="absolute top-3 right-3 bg-lion-gold text-black border-none z-10">
                    Featured
                  </Badge>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-3 text-lion-black">{project.title}</h4>
                  <p className="text-gray-600 line-clamp-4">{project.description}</p>
                  <div className="mt-4">
                    <a href="#" className="text-lion-gold hover:text-lion-darkgold font-medium inline-flex items-center">
                      View Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 italic mb-8">
            Lionvest Realty Private. Ltd., we bring you the best living and commercial places, which ensure extraordinary quality, dominant place and high-value investments. Let us help you find the right property that matches your aspirations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
