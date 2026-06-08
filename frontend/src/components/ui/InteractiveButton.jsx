import { motion } from "framer-motion";

export default function InteractiveButton({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "px-8 py-4 bg-black text-white font-black uppercase border-4 border-black",
    secondary:
      "px-8 py-4 bg-white text-black font-black uppercase border-4 border-black",
    outline:
      "px-8 py-4 bg-transparent text-black font-black uppercase border-4 border-black",
    minimal: "px-6 py-3 font-bold uppercase border-2 border-black",
  };

  const sizeVariants = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4",
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        rotate: -1,
        boxShadow: "8px 8px 0px 0px rgba(0,0,0,0.3)",
      }}
      whileTap={{ scale: 0.95, rotate: 1 }}
      onClick={onClick}
      className={`${variants[variant]} ${sizeVariants[size]} shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] transition-all duration-300 ${className}`}
      {...props}
    >
      <motion.span
        className="inline-block"
        initial={{ opacity: 1 }}
        whileHover={{ opacity: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
