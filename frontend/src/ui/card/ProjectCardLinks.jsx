import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

function BrutalButton({ href, label, className = "", icon, disabled = false }) {
  if (!href || disabled) return null;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{
        scale: 1.03,
        rotate: -1,
        boxShadow: "none",
        translateY: -2,
      }}
      whileTap={{
        scale: 0.97,
        rotate: 0,
        translateY: 1,
      }}
      transition={{ duration: 0.1 }}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 border-4 border-black font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`}
    >
      {label}
      {icon ? <span aria-hidden="true">{icon}</span> : null}
    </motion.a>
  );
}

export default function ProjectCardLinks({ githubUrl, liveUrl }) {
  return (
    <div className="flex flex-wrap gap-3 mt-5">
      <BrutalButton
        href={githubUrl}
        label="Code"
        icon={<FiGithub />}
        className="bg-white text-black"
      />
      <BrutalButton
        href={liveUrl}
        label="Demo"
        icon={<FiExternalLink />}
        className="bg-yellow-300 text-black"
      />
    </div>
  );
}
