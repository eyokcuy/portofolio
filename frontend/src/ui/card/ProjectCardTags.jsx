import { motion } from "framer-motion";

export default function ProjectCardTags({ tags = [] }) {
  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {tags.map(({ label, color }) => (
        <motion.span
          key={label}
          whileHover={{
            rotate: -3,
            scale: 1.05,
          }}
          className={`px-3 py-1 ${color} border-2 border-black text-xs font-black uppercase`}
        >
          {label}
        </motion.span>
      ))}
    </div>
  );
}
