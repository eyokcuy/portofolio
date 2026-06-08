import { motion } from "framer-motion";
import { useState } from "react";

export default function TextScramble({ children, className = "" }) {
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = "!@#$%^&*";

  const text = typeof children === "string" ? children : "";
  const textArray = text.split("");

  const handleMouseEnter = () => {
    setIsScrambling(true);
  };

  const handleAnimationComplete = () => {
    setIsScrambling(false);
  };

  return (
    <motion.span className={className} onMouseEnter={handleMouseEnter}>
      {textArray.map((char, i) => (
        <motion.span
          key={`${i}-${char}`}
          initial={{ opacity: 1 }}
          animate={
            isScrambling
              ? {
                  opacity: [1, 0.5, 1],
                }
              : {}
          }
          transition={{
            duration: 0.05,
            delay: i * 0.03,
          }}
          onAnimationComplete={
            i === textArray.length - 1 ? handleAnimationComplete : undefined
          }
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
