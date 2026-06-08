import { motion } from "framer-motion";

export default function PulseCircle({
  size = 100,
  color = "bg-blue-500",
  text = "",
  className = "",
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      {/* Outer pulsing circle */}
      <motion.div
        className={`absolute ${color} rounded-full`}
        style={{
          width: size,
          height: size,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Middle circle */}
      <motion.div
        className={`absolute ${color} rounded-full`}
        style={{
          width: size * 0.7,
          height: size * 0.7,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.1,
        }}
      />

      {/* Inner solid circle with text */}
      <motion.div
        className={`relative z-10 ${color} rounded-full flex items-center justify-center`}
        style={{
          width: size * 0.5,
          height: size * 0.5,
        }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <p className="font-black text-white text-center text-sm">{text}</p>
      </motion.div>
    </div>
  );
}
