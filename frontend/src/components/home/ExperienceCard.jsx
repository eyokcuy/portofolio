import { motion } from "framer-motion";

export default function ExperienceCard({ exp, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        x: 4,
        scale: 1.01,
      }}
      className={`${exp.accent} border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}
    >
      <p className="font-black uppercase text-sm">{exp.role}</p>
      <p className="mt-1 font-bold text-sm">{exp.company}</p>
      <p className="mt-0.5 font-bold text-xs opacity-70">{exp.period}</p>
    </motion.div>
  );
}
