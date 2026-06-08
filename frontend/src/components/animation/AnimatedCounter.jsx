import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { useEffect } from "react";

export default function AnimatedCounter({ value, duration = 2 }) {
  const prefersReduced = useReducedMotion();
  const motionValue = useMotionValue(0);
  const roundedValue = useTransform(motionValue, (latest) =>
    Math.round(latest),
  );

  useEffect(() => {
    if (prefersReduced) {
      motionValue.set(parseInt(value));
      return;
    }

    const controls = animate(motionValue, parseInt(value), {
      duration,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [value, duration, prefersReduced, motionValue]);

  return <motion.span className="font-black">{roundedValue}</motion.span>;
}
