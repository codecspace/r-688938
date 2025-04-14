
import { motion } from "framer-motion";
import { ArrowRight, Map } from "lucide-react";
import { Link } from "react-router-dom";

// Define a new array with updated project data that matches the UI in the screenshot
const projectsData = [
  {
    id: "tarc-ishva",
    developerName: "Tarc Ishva",
    location: "63A, Gurugram",
    image: "https://i.imgur.com/qtB7wnT.png",
    description: "TARC Ishva provides 3 and 4 BHK residences starting from 2850 square feet. These houses mix contemporary elegance with a huge layout, making them an ideal choice for those who appreciate the sophisticated life.",
  },
  {
    id: "birla-arika",
    developerName: "Birla Arika",
    location: "GURUGRAM",
    image: "https://i.imgur.com/VIVNtTM.png",
    description: "Birla Arika Super-Paljari 4 bhk + staff residences are designed for those who desire grandeur. With 4200 – 4900 square feet to extended size, these houses offer a unique lifestyle of specificity and elegance set within a reputed and cool enclave.",
  },
  {
    id: "godrej-aristocrat",
    developerName: "Godrej Aristocrat",
    location: "By hero homes",
    image: "https://i.imgur.com/BJ9aazL.png",
    description: "Located in Sector 49, the Golf Course presents an artistic and huge 3 and 4 BHK apartments with the extension roads, Gurugram, Godrej Aristocrat Utility areas. This work of craftsmanship has a triple-hit entrance lobby, an 18-hole golf course, landscaped terrace, a swimming pool, a luxury clubhouse, and more-which reduces the lifestyle of sophistication and indulgence.",
  },
  {
    id: "hero-homes",
    developerName: "The Palatial",
    location: "By hero homes",
    image: "https://i.imgur.com/1qjWa6d.jpg",
    description: "Sector 104, settled in Sector 104, is a premium residential project by Gurgaon, Hero Realty, extending with five high-growing towers in 11 acres. While offering 3 and 4 BHK apartments, this development is designed for modern urban families and professionals, which basically combines luxury and convenience in a rich place.",
  },
  {
    id: "aipl-joy-district",
    developerName: "AIPL Joy District",
    location: "Gurugram",
    image: "https://i.imgur.com/V3ZYKie.jpg",
    description: "AIPL Joy Square (Sector 62A) and AIPL Joy District (Sector 88) redefine commercial excellence with double-hit faces for branding, expander basements, dedicated escalators and lifts and lifts and a reputed ski garden at LID B level. These projects provide a perfect environment for retail, F&B and corporate development, making them a major investment site.",
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-sm uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-lion-gold to-lion-darkgold mb-2">
            Developers
          </h2>
          <h3 className="text-4xl font-display text-lion-black">
            Our Projects
          </h3>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-lion-gold to-lion-darkgold mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass-depth overflow-hidden rounded-xl"
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.developerName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 flex items-center justify-between">
                  <div>
                    <h4 className="text-white text-2xl font-medium">{project.developerName}</h4>
                    <div className="flex items-center mt-1 text-white/70">
                      <Map size={14} className="mr-1" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                  </div>
                  <Link to={`/project/${project.id}`}>
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20"
                      whileHover={{ 
                        scale: 1.1, 
                        backgroundColor: "rgba(212, 175, 55, 0.3)"
                      }}
                    >
                      <ArrowRight size={18} className="text-white" />
                    </motion.div>
                  </Link>
                </div>
              </div>
              <div className="p-6 bg-white">
                <p className="text-gray-600 line-clamp-3">{project.description}</p>
                <Link to={`/project/${project.id}`} className="inline-flex items-center mt-4 text-lion-gold font-medium group">
                  <span className="group-hover:underline">View Details</span>
                  <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16 glass-depth-card p-10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 italic max-w-3xl mx-auto font-light text-lg">
            "Lionvest Realty Private. Ltd., we bring you the best living and
            commercial places, which ensure extraordinary quality, dominant place
            and high-value investments. Let us help you find the right property
            that matches your aspirations."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
