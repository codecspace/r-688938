
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
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const [revealElements, setRevealElements] = useState([]);

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
    
    // Setup scroll reveal observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));
    
    // Store elements for cleanup
    setRevealElements(Array.from(elements));
    
    return () => {
      clearTimeout(timer);
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, [revealElements.length]);

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

  // Enhanced SimpleContact component with advanced glassmorphism and claymorphism
  const SimpleContact = () => {
    const opacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
    const scale = useTransform(scrollYProgress, [0.8, 0.9], [0.95, 1]);

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

  return (
    <>
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "5px",
          background: "linear-gradient(to right, #D4AF37, #F5D76E)",
          transformOrigin: "0%",
          zIndex: 1000,
          scaleX: scrollYProgress
        }}
      />
      
      <motion.div
        className="fixed bottom-6 right-6 w-12 h-12 bg-lion-gold/90 backdrop-blur-lg rounded-full flex items-center justify-center cursor-pointer z-50 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollYProgress.get() > 0.1 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.div>
      
      <motion.div
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {["home", "about", "projects", "properties", "contact"].map((section, i) => (
          <motion.a
            key={section}
            href={`#${section}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(section)?.scrollIntoView({behavior: 'smooth'});
            }}
            className="w-3 h-3 rounded-full bg-white/50 backdrop-blur-sm"
            whileHover={{ scale: 1.4, backgroundColor: "#D4AF37" }}
            animate={{
              scale: scrollYProgress.get() > (i * 0.2) && scrollYProgress.get() < ((i + 1) * 0.2) ? 1.4 : 1,
              backgroundColor: scrollYProgress.get() > (i * 0.2) && scrollYProgress.get() < ((i + 1) * 0.2) ? "#D4AF37" : "rgba(255,255,255,0.5)"
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </motion.div>

      <motion.div
        className="page-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>
    </>
  );
};

export default Index;
