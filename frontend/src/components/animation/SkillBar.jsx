import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SkillBar({
  skill,
  level = 85,
  color = "bg-blue-500",
  animated = true,
}) {
  const [displayLevel, setDisplayLevel] = useState(animated ? 0 : level);

  useEffect(() => {
    if (!animated) return;

    const timer = setTimeout(() => {
      const increment = level / 20;
      const interval = setInterval(() => {
        setDisplayLevel((prev) => {
          if (prev >= level) {
            clearInterval(interval);
            return level;
          }
          return Math.min(prev + increment, level);
        });
      }, 50);

      return () => clearInterval(interval);
    }, 200);

    return () => clearTimeout(timer);
  }, [level, animated]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="font-bold text-sm">{skill}</p>
        <motion.p
          className="text-xs font-black"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {Math.round(displayLevel)}%
        </motion.p>
      </div>
      <div className="h-3 bg-gray-200 border-2 border-black overflow-hidden">
        <motion.div
          className={`${color} h-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.1,
            ease: "easeOut",
          }}
        />
      </div>
    </motion.div>
  );
}
