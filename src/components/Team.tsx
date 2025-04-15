
import { motion } from "framer-motion";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

const teamData = [
  {
    name: "Prem Mohan Singh",
    role: "Director",
    image: "https://i.imgur.com/8U3fS8k.jpeg",
    phoneNumber: "+91 9773552334",
    email: "sales@lionvestrealty.com",
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

  const handleContactClick = (type, value) => {
    if (type === "phone") {
      window.location.href = `tel:${value}`;
    } else if (type === "email") {
      // Create a formatted email template for property inquiries
      const subject = "General Inquiry for Lionvest Realty";
      const body = `
Hello,

I am interested in learning more about your properties.

Please contact me regarding available properties.

Additional details:
- Name: [Your Name]
- Phone Number: [Your Phone Number]
- Best time to call: [Best Time to Call]
- Additional Questions: [Any Additional Questions]

Thank you,
[Your Name]
      `.trim();
      
      // Check if we're on desktop or mobile
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (!isMobileDevice) {
        // For desktop, open Gmail in browser
        window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${value}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      } else {
        // For mobile, use mailto:
        window.location.href = `mailto:${value}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
    }
    
    toast({
      title: `${type === "phone" ? "Calling" : "Emailing"} team member`,
      description: `${type === "phone" ? "Dialing" : "Opening email to"} ${value}`,
    });
  };

  return (
    <section className="py-24 relative bg-gradient-to-b from-white to-gray-50" id="team">
      {/* Abstract background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-purple-500/5 filter blur-[120px]"></div>
        <div className="absolute bottom-40 right-[15%] w-80 h-80 rounded-full bg-blue-500/5 filter blur-[100px]"></div>
        <div className="absolute top-[40%] right-[30%] w-64 h-64 rounded-full bg-lion-gold/5 filter blur-[80px]"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzlmOWY5ZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.span 
            className="block text-sm uppercase tracking-widest text-lion-gold mb-2 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Expert Team
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-display text-lion-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Meet Our Leadership
          </motion.h2>
          
          <motion.div 
            className="mx-auto max-w-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 text-lg">
              Our talented team of industry professionals brings decades of combined experience to deliver exceptional real estate solutions.
            </p>
          </motion.div>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-lion-gold/20 via-lion-gold to-lion-gold/20 mx-auto mt-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
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
            >
              <div className="overflow-hidden glass-depth-card relative h-[480px] rounded-2xl transition-all duration-500 card-glow-gold">
                {/* Image container with gradient overlay */}
                <div className="absolute inset-0 z-10">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500"
                    initial={{ opacity: 0.5 }}
                    whileHover={{ opacity: 0.7 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-700"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                  />
                </div>
                
                {/* Content overlay with glass effect */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-8 z-20 backdrop-blur-sm bg-black/10"
                  initial={{ y: 20, opacity: 0.9 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative">
                    {/* Gold accent line */}
                    <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-5 h-[2px] bg-lion-gold"></div>
                    
                    <h3 className="text-2xl font-display text-white mb-1 tracking-wide">
                      {member.name}
                    </h3>
                    
                    <p className="text-lion-gold font-medium mb-4 tracking-wider text-sm uppercase">
                      {member.role}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-6">
                    {/* Only show email for Prem Mohan Singh */}
                    {member.name === "Prem Mohan Singh" && member.email && (
                      <motion.button
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(212, 175, 55, 0.3)" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContactClick("email", member.email);
                        }}
                      >
                        <Mail className="w-5 h-5 text-white" />
                      </motion.button>
                    )}
                    {member.phoneNumber && (
                      <motion.button
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(212, 175, 55, 0.3)" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContactClick("phone", member.phoneNumber);
                        }}
                      >
                        <Phone className="w-5 h-5 text-white" />
                      </motion.button>
                    )}
                  </div>
                  
                  <motion.div 
                    className="mt-6 pt-4 border-t border-white/20"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-white/90 font-medium flex items-center gap-2">
                      <span className="text-lion-gold">View Profile</span>
                      <span className="w-6 h-[1px] bg-lion-gold/50"></span>
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Team Member Profile Dialog - Enhanced for luxury look */}
      {selectedMember && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-none rounded-xl shadow-2xl">
            <div className="relative w-full bg-white">
              {/* Header image with gradient overlay */}
              <div className="h-32 md:h-48 w-full relative overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10"></div>
                <img 
                  src={selectedMember.image} 
                  alt={selectedMember.name}
                  className="w-full h-full object-cover object-top blur-sm scale-110"
                />
              </div>

              <DialogHeader className="p-0">
                <div className="px-8 py-10 flex flex-col md:flex-row gap-8 items-start relative">
                  {/* Profile image */}
                  <div className="w-full md:w-1/3 -mt-24 md:-mt-32 z-20 relative">
                    <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                      <img 
                        src={selectedMember.image} 
                        alt={selectedMember.name} 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    
                    <div className="mt-6 space-y-4 bg-white shadow-lg p-6 rounded-xl border border-gray-100">
                      <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-lion-gold" /> 
                        <span>Contact</span>
                      </h4>
                      
                      <div className="flex items-center space-x-4">
                        {/* Only show email button for Prem Mohan Singh */}
                        {selectedMember.name === "Prem Mohan Singh" && selectedMember.email && (
                          <Button 
                            className="bg-gradient-to-r from-lion-gold/90 to-lion-darkgold/90 text-white hover:shadow-lg hover:shadow-lion-gold/20 transition-all duration-300"
                            onClick={() => handleContactClick("email", selectedMember.email)}
                          >
                            <Mail className="h-4 w-4 mr-2" /> Email
                          </Button>
                        )}
                        {selectedMember.phoneNumber && (
                          <Button 
                            className="bg-gradient-to-r from-lion-gold/90 to-lion-darkgold/90 text-white hover:shadow-lg hover:shadow-lion-gold/20 transition-all duration-300"
                            onClick={() => handleContactClick("phone", selectedMember.phoneNumber)}
                          >
                            <Phone className="h-4 w-4 mr-2" /> Call
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-[2px] bg-lion-gold"></div>
                      <span className="text-lion-gold text-sm uppercase tracking-wider font-medium">{selectedMember.role}</span>
                    </div>
                    
                    <DialogTitle className="text-3xl md:text-4xl font-display mb-6 text-gray-800">
                      {selectedMember.name}
                    </DialogTitle>
                    
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">About</h3>
                    <DialogDescription className="text-gray-600 whitespace-pre-line text-base leading-relaxed">
                      {selectedMember.bio}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default Team;
