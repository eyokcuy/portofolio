import { motion } from "framer-motion";

export default function AnimatedBorderBox({
  children,
  className = "",
  borderSize = 2,
  duration = 3,
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background: `conic-gradient(
            from 0deg,
            #fbbf24,
            #06b6d4,
            #ec4899,
            #fbbf24
          )`,
          padding: borderSize,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Content */}
      <div className={`relative bg-white`}>{children}</div>
    </div>
  );
}
