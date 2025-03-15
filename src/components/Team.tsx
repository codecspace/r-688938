
import { motion } from "framer-motion";

const teamData = [
  {
    name: "Prem Mohan Singh",
    role: "Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
  },
  {
    name: "Vaibhav Gupta",
    role: "Director",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
  },
  {
    name: "Jazbi Fatema",
    role: "Marketing Head",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
  }
];

const Team = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wider text-lion-gold mb-2">Team</h2>
          <h3 className="text-4xl font-display text-lion-black">Our Team</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamData.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <div className="bg-gradient-to-t from-lion-black to-transparent absolute inset-0 z-10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                  <h4 className="text-2xl font-display mb-1">{member.name}</h4>
                  <p className="text-lion-gold">{member.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
