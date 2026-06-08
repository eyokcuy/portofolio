import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TypewriterText({
  text,
  speed = 50,
  delay = 0,
  className = "",
  cursorVisible = true,
}) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.substring(0, index + 1));
        index++;
        if (index >= text.length) {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {displayedText}
      {cursorVisible && displayedText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="ml-1"
        >
          |
        </motion.span>
      )}
    </span>
  );
}
