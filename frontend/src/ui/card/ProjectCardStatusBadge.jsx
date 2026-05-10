import { motion } from "framer-motion";
import { FiActivity } from "react-icons/fi";

export default function ProjectCardStatusBadge({ status = "Live" }) {
  const label = String(status || "Live");

  const colorClass = label.toLowerCase().includes("live")
    ? "bg-yellow-300"
    : label.toLowerCase().includes("progress") ||
        label.toLowerCase().includes("wip")
      ? "bg-pink-300"
      : "bg-cyan-300";

  return (
    <motion.div
      whileHover={{ rotate: -2, translateY: -2, scale: 1.03 }}
      whileTap={{ translateY: 0, scale: 0.99 }}
      className={`inline-flex items-center gap-2 border-2 border-black px-3 py-1 ${colorClass}`}
    >
      <FiActivity className="text-xs stroke-[3]" />
      <span className="font-black uppercase text-[10px] tracking-tight">{label}</span>
    </motion.div>
  );
}
