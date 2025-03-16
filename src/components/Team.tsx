
import { motion } from "framer-motion";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";

const teamData = [
  {
    name: "Prem Mohan Singh",
    role: "Director",
    image: "https://i.imgur.com/8U3fS8k.jpeg",
    bio: "After working at the Pan-India level as the director of sales and strategy, Prem Mohan Singh has played an important role in the trade expansion and investment plan. He is a graduate from Delhi university and MBA from NIRM in retail and marketing. Furthermore, he has a diploma in computer science and fashion designing. His immense and diversified experience with international firms in establishing strategic trade operations in India has further strengthened their ability to navigate complex markets and run high-value real estate investments.\n\nCurrently, he specializes in managing the investment portfolio for established entrepreneurs, offering real estate solutions that align with prolonged growth and money-making strategies. Under his leadership, Lionvest Realty Pvt. Ltd. continues to set new benchmarks in the success of trust, excellence, and investment in the Indian real estate sector."
  },
  {
    name: "Vaibhav Gupta",
    role: "Director",
    image: "https://i.imgur.com/2rVC1DK.jpeg",
    bio: "With more than 12 years of experience in B2B and B2C sales, Vaibhav Gupta brings a strong strategic and out-operated approach to Lionvest Realty Private. An MBA graduate in Limited Sales and Marketing, he has created an impressive career in real estate and allied industries, holding major sales positions in famous multinational corporations such as Berger Paints, UltraTech Cement, and AkzoNobel India.\n\nHis expertise lies in sales strategy, market expansion, and business growth, making him a valuable leader in driving high-impact real estate transactions. With a deep understanding of consumer behavior, market trends, and investment dynamics, Vaibhav plays a crucial role in delivering tailored property solutions that align with client aspirations and long-term investment goals."
  },
  {
    name: "Jazbi Fatema",
    role: "Marketing Head",
    image: "https://i.imgur.com/UcLqNp5.jpeg",
    bio: "Expert Senior Digital marketing Management Professional with 12+ years of insightful & broad experience in; Marketing Strategy, Branding, Digital Marketing, Ecommerce end to end Marketing, Marketing Communications, Google Analytics, Retail, Corporate Communication, Media Planning, Budgeting, Advertising, Social Media Marketing, Channel Marketing, Campaigns, Strategic Marketing, liaising with external and internal stakeholders to promote business product. Passionate about nurturing talent and building high performance teams that are built on a culture of trust and transparency, respect for individual."
  }
];

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [open, setOpen] = useState(false);

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

  const openProfile = (member) => {
    setSelectedMember(member);
    setOpen(true);
  };

  return (
    <section className="py-20 bg-white" id="team">
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
              className="group cursor-pointer"
              onClick={() => openProfile(member)}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div className="relative overflow-hidden rounded-xl shadow-xl h-[450px]">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                <motion.img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white transform transition-all duration-500"
                  initial={{ y: 20, opacity: 0.8 }}
                  whileHover={{ y: 0, opacity: 1 }}
                >
                  <h4 className="text-3xl font-display mb-2">{member.name}</h4>
                  <p className="text-lion-gold font-medium mb-4">{member.role}</p>
                  
                  <motion.div className="flex space-x-4 mt-4">
                    <motion.span
                      className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(212, 175, 55, 0.3)" }}
                    >
                      <Mail className="w-5 h-5 text-white" />
                    </motion.span>
                    <motion.span
                      className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(212, 175, 55, 0.3)" }}
                    >
                      <Phone className="w-5 h-5 text-white" />
                    </motion.span>
                    <motion.span
                      className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(212, 175, 55, 0.3)" }}
                    >
                      <MessageSquare className="w-5 h-5 text-white" />
                    </motion.span>
                  </motion.div>
                  
                  <motion.div
                    className="mt-6 pt-4 border-t border-white/20"
                    initial={{ opacity: 0, height: 0 }}
                    whileHover={{ opacity: 1, height: "auto" }}
                  >
                    <p className="text-white/80 line-clamp-2">View full profile</p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Team Member Profile Dialog */}
      {selectedMember && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3">
                  <div className="rounded-xl overflow-hidden shadow-xl">
                    <img 
                      src={selectedMember.image} 
                      alt={selectedMember.name} 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <h4 className="text-xl font-semibold">Contact Me</h4>
                    <div className="flex items-center space-x-4">
                      <Button variant="outline" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <DialogTitle className="text-3xl font-display mb-1">{selectedMember.name}</DialogTitle>
                  <p className="text-lion-gold font-medium mb-6">{selectedMember.role}</p>
                  
                  <h3 className="text-xl font-semibold mb-4">About Me</h3>
                  <DialogDescription className="text-gray-700 whitespace-pre-line">
                    {selectedMember.bio}
                  </DialogDescription>
                  
                  <div className="mt-8 pt-6 border-t">
                    <h4 className="text-xl font-semibold mb-4">Contact Form</h4>
                    <form className="space-y-4">
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      />
                      <input 
                        type="email" 
                        placeholder="Your Email" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      />
                      <input 
                        type="tel" 
                        placeholder="Your Phone" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      />
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="consent" />
                        <label htmlFor="consent">I consent to the GDPR Terms</label>
                      </div>
                      <Button type="submit" className="w-full bg-lion-gold hover:bg-lion-darkgold text-black">
                        Send Message
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default Team;
