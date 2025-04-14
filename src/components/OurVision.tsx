
import { Award, Building, Trophy, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const OurVision = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0.8]);
  
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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };
  
  // 3D card tilt effect
  const [tiltAngles, setTiltAngles] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (centerY - y) / 15;
    const tiltY = (x - centerX) / 15;
    
    setTiltAngles({ x: tiltX, y: tiltY });
  };
  
  const handleMouseLeave = () => {
    setTiltAngles({ x: 0, y: 0 });
  };

  return (
    <section ref={containerRef} className="py-28 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Abstract background elements */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-40 left-[20%] w-72 h-72 rounded-full bg-lion-gold/20 filter blur-[80px]"></div>
        <div className="absolute bottom-40 right-[10%] w-96 h-96 rounded-full bg-blue-400/10 filter blur-[100px]"></div>
      </div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzlmOWY5ZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40 -z-20"></div>
      
      <motion.div style={{ y, opacity }} className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-lion-gold" />
            <span className="text-sm font-medium text-estate-500 uppercase tracking-wider">Core Values</span>
          </div>
          
          <h2 className="text-5xl font-display text-estate-800 mt-2 mb-6 brutalist-text">
            <span className="relative inline-block">
              Our Vision
              <div className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-lion-gold/10 via-lion-gold to-lion-gold/10"></div>
            </span>
          </h2>
          
          <p className="text-estate-500 max-w-2xl mx-auto text-lg">
            Our mission is to create innovative, sustainable communities that set new standards.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Claymorphism card */}
              <div 
                className="clay-gold p-8 h-full flex flex-col items-center text-center transform transition-transform duration-200"
                style={{ 
                  transform: `perspective(1000px) rotateX(${tiltAngles.x}deg) rotateY(${tiltAngles.y}deg)`,
                  boxShadow: `
                    6px 6px 16px rgba(0,0,0,0.08),
                    -6px -6px 16px rgba(255,255,255,0.8),
                    inset 1px 1px 2px rgba(255,255,255,0.4)
                  `
                }}
              >
                <motion.div 
                  className="mb-6 relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/80 to-lion-ivory flex items-center justify-center shadow-lg">
                    <div className="w-12 h-12 rounded-full bg-lion-gold/20 flex items-center justify-center">
                      <div className="text-lion-gold">
                        {value.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-lion-gold/30"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-lion-gold/20"></div>
                </motion.div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-estate-800 mb-4">{value.title}</h3>
                  <p className="text-estate-500 text-lg">{value.description}</p>
                </div>
                
                {/* Decorative underline */}
                <div className="mt-5 w-16 h-1 bg-gradient-to-r from-lion-gold/0 via-lion-gold to-lion-gold/0"></div>
              </div>
              
              {/* Decorative background effect */}
              <div className="absolute -z-10 inset-0 translate-x-3 translate-y-3 rounded-xl bg-lion-gold/5"></div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Decorative floating elements */}
        <div className="relative h-20 mt-16">
          <motion.div 
            className="absolute left-1/4 top-1/2 w-3 h-3 rounded-full bg-lion-gold/30"
            animate={{ 
              y: [0, -15, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ 
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute left-3/4 top-1/4 w-2 h-2 rounded-full bg-lion-gold/20"
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{ 
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default OurVision;
