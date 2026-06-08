import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function MagneticButton({ children, onClick, className = "" }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distance = 100; // magnetic reach
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance2d = Math.sqrt(dx * dx + dy * dy);

    if (distance2d < distance) {
      const force = 1 - distance2d / distance;
      setPosition({
        x: (dx / distance2d) * force * 15,
        y: (dy / distance2d) * force * 15,
      });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={position}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}
