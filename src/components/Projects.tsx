
import { motion } from "framer-motion";

// Define a new array with updated project data that matches the UI in the screenshot
const projectsData = [
  {
    id: "tarc-ishva",
    developerName: "TARC ISHVĀ",
    location: "63A, Gurugram",
    image: "https://i.imgur.com/qtB7wnT.png",
    description: "TARC Ishva provides 3 and 4 BHK residences starting from 2850 square feet. These houses mix contemporary elegance with a huge layout, making them an ideal choice for those who appreciate the sophisticated life.",
  },
  {
    id: "birla-arika",
    developerName: "BIRLA ARIKA",
    location: "GURUGRAM",
    image: "https://i.imgur.com/VIVNtTM.png",
    description: "Birla Arika Super-Paljari 4 bhk + staff residences are designed for those who desire grandeur. With 4200 – 4900 square feet to extended size, these houses offer a unique lifestyle of specificity and elegance set within a reputed and cool enclave.",
  },
  {
    id: "godrej-aristocrat",
    developerName: "THE PALJARI",
    location: "By hero homes",
    image: "https://i.imgur.com/Tm5t9pp.jpg",
    description: "Located in Sector 49, the Golf Course presents an artistic and huge 3 and 4 BHK apartments with the extension roads, Gurugram, Godrej Aristocrat Utility areas. This work of craftsmanship has a triple-hit entrance lobby, an 18-hole golf course, landscaped terrace, a swimming pool, a luxury clubhouse, and more-which reduces the lifestyle of sophistication and indulgence.",
  },
  {
    id: "hero-homes",
    developerName: "THE PALJARI",
    location: "By hero homes",
    image: "https://i.imgur.com/1qjWa6d.jpg",
    description: "Sector 104, settled in Sector 104, is a premium residential project by Gurgaon, Hero Realty, extending with five high-growing towers in 11 acres. While offering 3 and 4 BHK apartments, this development is designed for modern urban families and professionals, which basically combines luxury and convenience in a rich place.",
  },
  {
    id: "aipl-joy-district",
    developerName: "AIPL JOY DISTRICT",
    location: "Gurugram",
    image: "https://i.imgur.com/V3ZYKie.jpg",
    description: "AIPL Joy Square (Sector 62A) and AIPL Joy District (Sector 88) redefine commercial excellence with double-hit faces for branding, expander basements, dedicated escalators and lifts and lifts and a reputed ski garden at LID B level. These projects provide a perfect environment for retail, F&B and corporate development, making them a major investment site.",
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-lion-black">
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
          <h3 className="text-4xl font-display text-white">
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

        <div className="space-y-12">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-lion-black/80 backdrop-blur-sm rounded-xl overflow-hidden border border-lion-gold/20 hover:border-lion-gold/40 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.1)]"
            >
              <div className={`p-8 flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}>
                <div className="w-full md:w-2/5 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-lion-darkgold/20 to-lion-gold/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                  <img
                    src={project.image}
                    alt={project.developerName}
                    className="w-full h-auto rounded-lg object-cover shadow-lg transition-transform group-hover:scale-[1.02] duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-lion-black/80 px-3 py-1 text-lion-gold text-xs tracking-wider rounded-md backdrop-blur-sm">
                    {project.location}
                  </div>
                </div>
                <div className="w-full md:w-3/5">
                  <h4 className="text-3xl font-display font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-lion-gold to-lion-lightgold">
                    {project.developerName}
                  </h4>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {project.description}
                  </p>
                  <div className="mt-6">
                    <button className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-lion-gold transition duration-300 ease-out border-2 border-lion-gold/50 rounded-md shadow-md group">
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-lion-darkgold to-lion-gold group-hover:translate-x-0 ease-out">
                        <span className="mr-1">View Details</span> 
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </span>
                      <span className="absolute flex items-center justify-center w-full h-full text-lion-gold transition-all duration-300 transform group-hover:translate-x-full ease">Explore Project</span>
                      <span className="relative invisible">Explore Project</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16 bg-lion-black/80 p-10 rounded-2xl shadow-md border border-lion-gold/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 italic max-w-3xl mx-auto font-light text-lg">
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
