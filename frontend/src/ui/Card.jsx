import { motion } from "framer-motion";

export default function Card({
  children,
  className = "",
  hoverRotate = 1,
  hoverScale = 1.02,
  shadowSize = "8px",
  shadowColor = "rgba(0,0,0,1)",
  isStatic = false,
  style = {},
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

  // Detect if background is provided via style or className
  // If it's a hex color in style.backgroundColor, it's custom.
  // If className has a bg- class, it's also custom.
  const hasCustomBg = className.includes("bg-") || (style && style.backgroundColor);

  return (
    <motion.div
      whileHover={hoverEffect}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
      className={`border-4 border-black p-6 ${
        hasCustomBg ? "" : "bg-white"
      } ${className}`}
      style={{
        boxShadow: `${shadowSize} ${shadowSize} 0px 0px ${shadowColor}`,
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

