
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-sm uppercase tracking-wider text-lion-gold mb-2">Developers</h2>
          <h3 className="text-4xl font-display text-lion-black">Our Projects</h3>
        </motion.div>

        {projectData.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 mb-20 items-center`}
          >
            <div className="w-full md:w-1/2 relative overflow-hidden rounded-xl shadow-xl group h-[400px]">
              <div className="absolute inset-0 bg-lion-black/30 z-10 group-hover:bg-lion-black/40 transition-all duration-500"></div>
              <motion.img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 ease-in-out"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
              />
              <div className="absolute top-4 right-4 z-20">
                <motion.span 
                  className="bg-lion-gold text-black text-xs font-bold px-3 py-1 rounded-full tracking-wider uppercase"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  Featured
                </motion.span>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 p-4">
              <motion.h4 
                className="text-2xl font-semibold mb-4 text-lion-black relative inline-block"
                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {project.title}
                <motion.span 
                  className="absolute bottom-0 left-0 h-0.5 bg-lion-gold" 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </motion.h4>
              
              <motion.p 
                className="text-gray-600 mb-6 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {project.description}
              </motion.p>
              
              <motion.a
                href="#"
                className="inline-flex items-center text-lion-gold hover:text-lion-darkgold font-medium transition-colors group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ x: 5 }}
              >
                View Details
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </div>
          </motion.div>
        ))}

        <motion.div 
          className="text-center mt-12 bg-white p-8 rounded-xl shadow-md border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 italic">
            Lionvest Realty Private. Ltd., we bring you the best living and commercial places, which ensure extraordinary quality, dominant place and high-value investments. Let us help you find the right property that matches your aspirations.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
