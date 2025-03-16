
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projectsData } from "@/data/projectsData";

const Projects = () => {
  // Take the first 5 projects for display
  const displayProjects = projectsData.slice(0, 5);

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
          <h2 className="text-sm uppercase tracking-wider text-lion-gold mb-2">
            Developers
          </h2>
          <h3 className="text-4xl font-display text-lion-black">
            Our Projects
          </h3>
        </motion.div>

        {displayProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-8 mb-20 items-center`}
          >
            <div className="w-full md:w-1/2 relative overflow-hidden rounded-xl shadow-xl group">
              <div className="absolute inset-0 bg-lion-black/30 z-10 group-hover:bg-lion-black/40 transition-all duration-500"></div>
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-[400px] object-cover transition-transform duration-700 ease-in-out"
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
                  whileInView={{ width: "100%" }}
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

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/project/${project.id}`}
                  className="inline-flex items-center text-lion-gold hover:text-lion-darkgold font-medium transition-colors group"
                >
                  <motion.span
                    whileHover={{ x: 5 }}
                    className="flex items-center"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </motion.span>
                </Link>
              </motion.div>
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
            Lionvest Realty Private. Ltd., we bring you the best living and
            commercial places, which ensure extraordinary quality, dominant place
            and high-value investments. Let us help you find the right property
            that matches your aspirations.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
