import { motion } from "framer-motion";
import { staggerContainer } from "../../utils/animations";

export default function SplitText({
  text,
  className = "",
  stagger = 0.05,
  delay = 0,
}) {
  const words = text.split(" ");

  const wordVariants = {
    hidden: { opacity: 0, y: 20, rotateX: 90 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const customStaggerContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      className={`inline ${className}`}
      variants={customStaggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants}
          className="inline-block mr-2 last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
