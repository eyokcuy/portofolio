import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function CountUp({
  from = 0,
  to = 100,
  duration = 2,
  decimals = 0,
  suffix = "",
  prefix = "",
  className = "",
}) {
  const motionValue = useMotionValue(from);
  const roundedValue = useTransform(motionValue, (latest) =>
    parseFloat(latest.toFixed(decimals)),
  );

  useEffect(() => {
    const animation = {
      duration,
      ease: "easeOut",
    };

    motionValue.animate(to, animation);
  }, [to, duration, motionValue]);

  return (
    <motion.span className={className}>
      {prefix}
      {roundedValue}
      {suffix}
    </motion.span>
  );
}
