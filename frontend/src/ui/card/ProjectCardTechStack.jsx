import { motion } from "framer-motion";

export default function ProjectCardTechStack({ techStack = [] }) {
  if (!techStack?.length) return null;

  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {techStack.map((t, i) => {
        const label = typeof t === "string" ? t : t?.label;
        const key = `${label}-${i}`;

        // keep color brutal & readable: cycle a small set
        const colorClass =
          i % 3 === 0
            ? "bg-yellow-300"
            : i % 3 === 1
              ? "bg-cyan-300"
              : "bg-pink-300";

        if (!label) return null;

        return (
          <motion.span
            key={key}
            whileHover={{ rotate: -3, scale: 1.06, translateY: -2 }}
            className={`px-3 py-1 border-2 border-black text-xs font-black uppercase ${colorClass}`}
          >
            {label}
          </motion.span>
        );
      })}
    </div>
  );
}
