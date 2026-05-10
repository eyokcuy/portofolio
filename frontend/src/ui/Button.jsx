import { motion } from "framer-motion";

export default function Button({
  children,
  variant = "black",
  onClick,
  className = "",
  isStatic = false,
  ...props
}) {
  const variants = {
    black:
      "px-6 py-3 bg-black text-yellow-300 border-4 border-black font-black uppercase cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
    white:
      "px-6 py-3 bg-white text-black border-4 border-black font-black uppercase cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
    cyan: "px-6 py-3 bg-cyan-300 text-black border-4 border-black font-black uppercase cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
    pink: "px-6 py-3 bg-pink-300 text-black border-4 border-black font-black uppercase cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
    yellow:
      "px-6 py-3 bg-yellow-300 text-black border-4 border-black font-black uppercase cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
  };

  const hoverEffect = isStatic
    ? {
        translate: "2px 2px",
        boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
      }
    : {
        scale: 1.03,
        rotate: variant === "black" ? -1 : 1,
        boxShadow: "none",
      };

  return (
    <motion.button
      whileHover={hoverEffect}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
      className={`${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}
