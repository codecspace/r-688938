
import { motion } from "framer-motion";

const VisionMission = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="py-20 bg-lion-black min-h-screen flex items-center">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-sm uppercase tracking-wider text-lion-gold mb-2">Our Philosophy</h2>
          <h3 className="text-4xl font-display text-white">Vision & Mission</h3>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision Card */}
          <motion.div
            className="relative bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg border-l-4 border-lion-gold hover:shadow-2xl transition-all duration-300"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
            }}
          >
            <h3 className="text-3xl font-display mb-6 flex items-center">
              <motion.span 
                className="text-lion-gold mr-2"
                animate={{ 
                  textShadow: ["0 0 0px rgba(212, 175, 55, 0)", "0 0 10px rgba(212, 175, 55, 0.5)", "0 0 0px rgba(212, 175, 55, 0)"]
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                Our Vision
              </motion.span>
            </h3>
            <div className="space-y-4 text-gray-300">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                Our vision is to be recognized as a leader in the real estate
                industry, known for our unwavering commitment to quality,
                transparency and customer-centric solutions. We aim to shape the
                future of real estate by offering investment opportunities and
                world-class experiences that fulfill the developed aspirations of
                modern buyers and investors.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
              >
                We expand their presence in the major residential and commercial
                hubs, establishing new benchmarks in luxury, stability and
                investment security. Through our expertise, we want to build a
                real estate ecosystem, where each customer finds the right
                assets, whether for residential enjoyment or commercial
                prosperity.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ once: true }}
              >
                At Lionvest Realty Pvt. Ltd., we believe in creating value beyond
                transactions we are building relationships, trust, and a future
                where real estate investments are simplified, secure, and
                strategically sound.
              </motion.p>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            className="relative bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg border-l-4 border-lion-gold hover:shadow-2xl transition-all duration-300"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
            }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-3xl font-display mb-6 flex items-center">
              <motion.span 
                className="text-lion-gold mr-2"
                animate={{ 
                  textShadow: ["0 0 0px rgba(212, 175, 55, 0)", "0 0 10px rgba(212, 175, 55, 0.5)", "0 0 0px rgba(212, 175, 55, 0)"]
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                Our Mission
              </motion.span>
            </h3>
            <div className="space-y-4 text-gray-300">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                Lionvest Realty Private. Ltd., our mission is to redefine real
                estate experience by providing extraordinary service, strategic
                investment solutions, and unique customer satisfaction. We try to
                become a reliable partner for homebuyers, investors, and
                businesses by offering premium residential and commercial
                properties in Delhi, Noida and Gurgaon.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
              >
                With a strong commitment to integrity, innovation and market
                expertise, we ensure that each property transaction is
                uninterrupted, safe and rewarding. Our focus is just beyond
                selling property-our objective is to empower our customers with
                practical guidance, data-operated strategies and investment
                opportunities that promote long-term financial growth.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ once: true }}
              >
                By embracing state-of-the-art technology and industry, we are
                constantly developing to meet the dynamic needs of our
                customers. Whether it is a luxury residence, high-value
                commercial place, or strategic real estate investment, Lionvest
                Realty Private. Ltd. is dedicated to creation of excellence,
                trust and success in the real estate sector.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
