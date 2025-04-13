
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const NavDots = () => {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState(0);
  const sections = ["home", "about", "vision-mission", "projects", "properties", "contact"];
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(v => {
      const sectionIndex = Math.floor(v * sections.length);
      setActiveSection(Math.min(sectionIndex, sections.length - 1));
    });
    
    return () => unsubscribe();
  }, [scrollYProgress, sections.length]);
  
  return (
    <motion.div
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {sections.map((section, i) => (
        <motion.a
          key={section}
          href={`#${section}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(section)?.scrollIntoView({behavior: 'smooth'});
          }}
          className="w-3 h-3 rounded-full bg-white/50 backdrop-blur-sm"
          animate={{
            scale: activeSection === i ? 1.4 : 1,
            backgroundColor: activeSection === i ? "#D4AF37" : "rgba(255,255,255,0.5)"
          }}
          transition={{ duration: 0.2 }}
        />
      ))}
    </motion.div>
  );
};

export default NavDots;
