
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

const MagneticButton = ({ 
  children, 
  className = "", 
  strength = 25,
  onClick
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    const x = (clientX - (left + width / 2)) / strength;
    const y = (clientY - (top + height / 2)) / strength;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  // Reset on resize to prevent button getting stuck in place
  useEffect(() => {
    const handleResize = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      ref={buttonRef}
      className={`magnetic-button inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
    >
      <motion.div
        animate={{ x: position.x * 1.2, y: position.y * 1.2 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default MagneticButton;
