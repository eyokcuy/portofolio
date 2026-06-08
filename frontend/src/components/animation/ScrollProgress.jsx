import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollProgress() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();

  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="fixed top-16 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 origin-left"
    />
  );
}
