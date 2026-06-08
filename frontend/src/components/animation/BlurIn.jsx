import { motion } from "framer-motion";

export default function BlurIn({
  children,
  delay = 0,
  className = "",
  duration = 0.8,
}) {
  return (
    <motion.div
      className={className}
      initial={{
        filter: "blur(10px)",
        opacity: 0,
      }}
      whileInView={{
        filter: "blur(0px)",
        opacity: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
