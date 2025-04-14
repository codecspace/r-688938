
import React from "react";
import { motion } from "framer-motion";
import { Book, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const VisionMission = () => {
  // Animation variants
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-lion-black to-zinc-900">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-purple-500/30 filter blur-[100px]"></div>
        <div className="absolute bottom-40 right-[15%] w-80 h-80 rounded-full bg-blue-500/20 filter blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm uppercase tracking-wider text-lion-gold mb-2">Our Philosophy</h2>
          <h3 className="text-4xl font-display text-white mb-4">Vision & Mission</h3>
          <div className="h-1 w-24 bg-gradient-to-r from-lion-gold to-lion-lightgold mx-auto"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Vision Card */}
          <motion.div variants={itemVariants} className="h-full">
            <Card className="bg-white/5 backdrop-blur-sm border-none shadow-xl h-full overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-80"></div>
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
              
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-xl bg-blue-500/10 mr-4">
                    <Target className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-display text-white">Our Vision</h3>
                </div>

                <div className="space-y-4 text-gray-300">
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
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
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
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
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mission Card */}
          <motion.div variants={itemVariants} className="h-full">
            <Card className="bg-white/5 backdrop-blur-sm border-none shadow-xl h-full overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-red-600/10 opacity-80"></div>
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-amber-500 to-red-500"></div>
              
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-xl bg-amber-500/10 mr-4">
                    <Book className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-display text-white">Our Mission</h3>
                </div>

                <div className="space-y-4 text-gray-300">
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
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
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
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
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMission;
