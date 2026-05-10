import { motion } from "framer-motion";

export default function ProjectCardCTA({
  text = "View Project →",
  liveUrl,
  githubUrl,
}) {
  const href = liveUrl || githubUrl;
  if (!href) return null;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{
        scale: 1.03,
        rotate: -1,
        boxShadow: "none",
      }}
      whileTap={{ scale: 0.96 }}
      className="mt-5 inline-flex px-4 py-2 bg-black text-yellow-300 border-4 border-black
                     font-black uppercase text-sm
                     shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                     hover:-translate-y-1 hover:translate-x-1
                     transition-all duration-100"
    >
      {text}
    </motion.a>
  );
}
