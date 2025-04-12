
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleElementHover = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      const isClickable = hoveredElement?.closest('a, button, [role="button"], input, select, textarea, label, .clickable');
      setIsPointer(!!isClickable);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleElementHover);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleElementHover);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [position.x, position.y]);

  // Don't render custom cursor on touch devices
  if (typeof window !== 'undefined' && 
      ('ontouchstart' in window || 
      navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Main cursor circle */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full mix-blend-difference ${isHidden ? 'opacity-0' : 'opacity-100'}`}
        style={{
          width: isClicking ? 24 : 16,
          height: isClicking ? 24 : 16,
          backgroundColor: "#D4AF37",
        }}
        animate={{
          x: position.x - (isClicking ? 12 : 8),
          y: position.y - (isClicking ? 12 : 8),
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          mass: 0.5,
        }}
      />

      {/* Cursor trail dot */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-white/60 ${isHidden ? 'opacity-0' : 'opacity-80'}`}
        style={{
          width: 6,
          height: 6,
        }}
        animate={{
          x: position.x - 3,
          y: position.y - 3,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 150,
          mass: 0.3,
          duration: 0.05,
        }}
      />

      {/* Cursor ring for hover states */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-white/70 ${
          isPointer ? "opacity-100" : "opacity-0"
        } ${isHidden ? 'hidden' : ''}`}
        style={{
          backgroundColor: "transparent",
        }}
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          width: isPointer ? 32 : 0,
          height: isPointer ? 32 : 0,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.8,
        }}
      />
    </>
  );
};

export default CustomCursor;
