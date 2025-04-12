
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import VisionMission from "@/components/VisionMission";
import Projects from "@/components/Projects";
import Team from "@/components/Team";
import FeaturedProperties from "@/components/FeaturedProperties";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Pre-load main content to prevent white flash
    const preloadImages = () => {
      const images = [
        "https://imgur.com/ku5rlCk.jpg",
        "https://i.imgur.com/YQSL3gr.jpg",
        "https://i.imgur.com/VIVNtTM.jpg",
        "https://i.imgur.com/Tm5t9pp.jpg",
        "https://i.imgur.com/1qjWa6d.jpg",
        "https://i.imgur.com/V3ZYKie.jpg",
        "https://i.postimg.cc/N0dcJVDT/AIPL-Joy-District-Sector-88-Gurgaon-1719656222.webp",
        "https://i.postimg.cc/vBpHhk8h/image.png", 
        "https://i.postimg.cc/XqdNzLpb/image.png",
        "https://i.postimg.cc/dVmnGZmN/image.png",
        "https://i.postimg.cc/MHQmHnpD/image.png",
        "https://i.postimg.cc/rF59LRby/image.png",
        "https://i.postimg.cc/nhkYXbp6/image.png",
        "https://i.postimg.cc/d0VRdH0D/image.png",
        "https://i.postimg.cc/vB1W24fs/image.png"
      ];
      
      images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preloadImages();
    
    // Set document background to black during transition to prevent white flash
    document.body.style.backgroundColor = '#000';
    
    // Reduced loading time to 2.5 seconds for a quicker experience
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Reset background color after content is loaded
      setTimeout(() => {
        document.body.style.backgroundColor = '';
      }, 300);
    }, 2500); // Reduced from 5000ms to 2500ms
    
    return () => clearTimeout(timer);
  }, []);

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

  // Simple contact section component with glassmorphism
  const SimpleContact = () => (
    <section id="contact" className="bg-gray-100 py-20 relative overflow-hidden">
      {/* Glassmorphism decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-lion-gold/20 filter blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-lion-gold/30 filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-4 gold-gradient-text">Contact Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to learn more about our properties or have questions? Reach out to us directly!
          </p>
        </div>
        
        <div className="glass-panel py-10 px-6 mb-6 mx-auto max-w-lg">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full">
            <Button 
              onClick={() => handleContactAction("phone")}
              className="bg-lion-gold hover:bg-lion-darkgold text-black w-full md:w-auto py-6 px-8 text-lg font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              <Phone className="h-5 w-5" /> Call Us
            </Button>
            
            <Button 
              onClick={() => handleContactAction("email")}
              className="bg-lion-black hover:bg-lion-darkgray text-white w-full md:w-auto py-6 px-8 text-lg font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              <Mail className="h-5 w-5" /> Email Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div 
            key="content"
            className="min-h-screen w-full overflow-hidden bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Navbar />
            <Hero />
            <AboutUs />
            <VisionMission />
            <Projects />
            <Team />
            <FeaturedProperties />
            <SimpleContact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
