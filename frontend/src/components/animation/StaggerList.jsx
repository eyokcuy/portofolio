import { motion } from "framer-motion";
import { staggerContainer, itemVariants } from "../../utils/animations";

export default function StaggerList({
  items,
  renderItem,
  className = "",
  containerDelay = 0,
}) {
  const customStagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: containerDelay,
      },
    },
  };

  return (
    <motion.ul
      className={className}
      variants={customStagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {items.map((item, i) => (
        <motion.li key={`${item.id || i}`} variants={itemVariants}>
          {renderItem(item, i)}
        </motion.li>
      ))}
    </motion.ul>
  );
}
