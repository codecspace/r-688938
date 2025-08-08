
import { motion } from "framer-motion";

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
    <section id="projects" className="py-28 bg-gradient-to-b from-white to-lion-ivory">
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
          <h3 className="text-5xl md:text-6xl font-display tracking-tight text-lion-black">
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

        <div className="space-y-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass-card overflow-hidden hover-lift card-glow-gold"
            >
              <div className="p-8 flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-2/5">
                  <img
                    src={project.image}
                    alt={project.developerName}
                    className="w-full h-auto rounded-lg object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="w-full md:w-3/5">
                  <h4 className="text-2xl font-display font-semibold mb-4 text-lion-black">
                    {project.developerName}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16 glass-card p-10"
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
