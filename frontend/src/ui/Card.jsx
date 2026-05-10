import { motion } from "framer-motion";

export default function Card({
  children,
  className = "",
  hoverRotate = 1,
  hoverScale = 1.02,
  shadowSize = "8px",
  shadowColor = "rgba(0,0,0,1)",
  isStatic = false,
  ...props
}) {
  const hoverEffect = isStatic
    ? {
        translate: "2px 2px",
        boxShadow: "none",
      }
    : {
        scale: hoverScale,
        rotate: hoverRotate,
        boxShadow: "none",
      };

  return (
    <motion.div
      whileHover={hoverEffect}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
      className={`border-4 border-black p-6 shadow-[${shadowSize}_${shadowSize}_0px_0px_${shadowColor}] ${
        className.includes("bg-") ? "" : "bg-white"
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
