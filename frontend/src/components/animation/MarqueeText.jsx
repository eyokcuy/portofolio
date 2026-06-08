import { motion } from "framer-motion";

export default function MarqueeText({ text, direction = "left", speed = 30 }) {
  const isLeft = direction === "left";

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex whitespace-nowrap gap-4"
        animate={{
          x: isLeft ? [-100, 100] : [100, -100],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...Array(3)].map((_, i) => (
          <span key={i} className="text-2xl font-black uppercase">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
