
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projectsData } from "@/data/projectsData";

const Projects = () => {
  // Take the first 5 projects for display
  const displayProjects = projectsData.slice(0, 5);

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
          {/* This is where you can edit the "Developers" text */}
          <h2 className="text-sm uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-lion-gold to-lion-darkgold mb-2">
            Developers
          </h2>
          {/* This is where you can edit the "Our Projects" text */}
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

        {displayProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-12 mb-28 items-center`}
          >
            <div className="w-full md:w-3/5 relative overflow-hidden rounded-xl shadow-xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-lion-black/50 to-transparent z-10 group-hover:from-lion-black/70 transition-all duration-500"></div>
              {/* This is where you can edit the project images */}
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-[450px] object-cover transition-transform duration-700"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
              />
              <motion.div 
                className="absolute top-6 right-6 z-20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <span className="bg-gradient-to-r from-lion-gold to-lion-darkgold text-black text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase shadow-lg">
                  Featured
                </span>
              </motion.div>
            </div>

            <div className="w-full md:w-2/5 p-6 backdrop-blur-sm bg-white/50 rounded-xl shadow-sm">
              <motion.h4
                className="text-2xl font-display font-semibold mb-4 text-lion-black relative inline-block"
                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {project.title}
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-lion-gold to-lion-darkgold"
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
                className="mt-4"
              >
                <Link
                  to={`/project/${project.id}`}
                  className="inline-flex items-center bg-gradient-to-r from-lion-gold to-lion-darkgold hover:from-lion-darkgold hover:to-lion-gold text-black px-6 py-3 rounded-md font-medium transition-colors group shadow-md"
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
          className="text-center mt-16 bg-white p-10 rounded-2xl shadow-md border border-gray-100 backdrop-blur-sm bg-white/80"
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
