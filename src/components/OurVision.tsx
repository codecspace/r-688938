
import { Award, Building, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const OurVision = () => {
  const values = [
    {
      icon: <Building className="w-6 h-6" />,
      title: "Elevated Living Spaces",
      description: "Creating exceptional living environments that blend luxury with functionality.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Sustainable Communities",
      description: "Building eco-conscious developments that respect and enhance their surroundings.",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Expert Guidance",
      description: "Providing professional expertise and personalized service at every step.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-estate-500 uppercase tracking-wider">Core Values</span>
          <h2 className="text-4xl font-display text-estate-800 mt-2 mb-4">Our Vision</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-estate-400 to-estate-600 mx-auto mb-6"></div>
          <p className="text-estate-500 max-w-2xl mx-auto">
            Our mission is to create innovative, sustainable communities that set new standards.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative bg-white rounded-xl p-8 shadow-lg border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="absolute -top-5 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-estate-100 flex items-center justify-center">
                  <div className="text-estate-600">
                    {value.icon}
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-estate-800 mb-3">{value.title}</h3>
                <p className="text-estate-500">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurVision;
