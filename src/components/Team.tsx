
import { motion } from "framer-motion";

const teamData = [
  {
    name: "Prem Mohan Singh",
    role: "Director",
    image: "https://imgur.com/a/xJ8lEdp"
  },
  {
    name: "Vaibhav Gupta",
    role: "Director",
    image: "https://imgur.com/2rVC1DK"
  },
  {
    name: "Jazbi Fatema",
    role: "Marketing Head",
    image: "https://imgur.com/UcLqNp5"
  }
];

const Team = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-sm uppercase tracking-wider text-lion-gold mb-2">Team</h2>
          <h3 className="text-4xl font-display text-lion-black">Our Team</h3>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {teamData.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <div className="bg-gradient-to-t from-lion-black to-transparent absolute inset-0 z-10 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                <motion.img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-96 object-cover object-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white transform transition-transform duration-500"
                  initial={{ y: 10, opacity: 0.8 }}
                  whileHover={{ y: 0, opacity: 1 }}
                >
                  <h4 className="text-2xl font-display mb-2">{member.name}</h4>
                  <p className="text-lion-gold font-medium">{member.role}</p>
                  
                  <motion.div
                    className="h-0.5 bg-lion-gold mt-4 w-0"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
