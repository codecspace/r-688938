
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { toast } from "@/hooks/use-toast";

const SimpleContact = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.8, 0.9], [0.95, 1]);

  const handleContactAction = (type) => {
    if (type === "phone") {
      window.location.href = "tel:9773552334";
      toast({
        title: "Dialing...",
        description: "Calling 9773552334",
      });
    } else if (type === "email") {
      // Check if we're on desktop and use Gmail web interface
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      let mailtoUrl = '';
      
      const subject = "Inquiry from Lionvest Realty Website";
      const body = "Hi, I'm interested in knowing more about your services.";
      
      if (!isMobileDevice) {
        // For desktop, open Gmail in browser
        mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=sales@lionvestrealty.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoUrl, '_blank');
      } else {
        // For mobile, use mailto:
        mailtoUrl = `mailto:sales@lionvestrealty.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
      }
      
      toast({
        title: "Opening email client",
        description: "Composing email to sales@lionvestrealty.com",
      });
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Enhanced glassmorphism decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-lion-gold/10 filter blur-[100px]"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-lion-gold/15 filter blur-[120px]"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div 
          className="text-center mb-16 reveal-on-scroll"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm uppercase tracking-wider text-lion-gold mb-2 brutalist-text">Get In Touch</h2>
          <h3 className="text-4xl font-display text-lion-black mb-4">Contact Us</h3>
          <div className="h-1 w-24 bg-gradient-to-r from-lion-gold to-lion-lightgold mx-auto mt-4 mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to learn more about our properties or have questions? Reach out to us directly!
          </p>
        </motion.div>
        
        <motion.div
          className="clay-gold mb-10 mx-auto max-w-xl overflow-hidden relative"
          style={{ opacity, scale }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Glass shimmer effect overlay */}
          <div className="absolute inset-0 glass-shimmer pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full relative z-10">
            <Button 
              onClick={() => handleContactAction("phone")}
              className="bg-lion-gold hover:bg-lion-darkgold text-black w-full md:w-auto py-6 px-8 text-lg font-medium flex items-center justify-center gap-3 shadow-lg btn-3d"
              size="lg"
            >
              <Phone className="h-5 w-5" /> Call Us
            </Button>
            
            <Button 
              onClick={() => handleContactAction("email")}
              className="bg-lion-black hover:bg-lion-darkgray text-white w-full md:w-auto py-6 px-8 text-lg font-medium flex items-center justify-center gap-3 shadow-lg btn-glow overflow-hidden relative"
              size="lg"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Mail className="h-5 w-5" /> Email Us
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SimpleContact;
