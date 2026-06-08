import { motion } from "framer-motion";

export default function MorphingBlob({ className = "", children }) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "70% 30% 40% 60% / 40% 70% 60% 30%",
          "40% 70% 60% 30% / 70% 40% 30% 60%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
