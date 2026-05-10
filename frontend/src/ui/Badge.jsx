import { motion } from "framer-motion";

export default function Badge({ children, variant = "black", className = "" }) {
  const variants = {
    black: "bg-black text-yellow-300",
    yellow: "bg-yellow-300 text-black",
    cyan: "bg-cyan-300 text-black",
    pink: "bg-pink-300 text-black",
  };

  return (
    <motion.div
      whileHover={{
        rotate: -2,
        scale: 1.03,
      }}
      className={`inline-block px-4 py-2 border-4 border-black 
                 text-sm font-black uppercase tracking-[0.2em]
                 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${variants[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
