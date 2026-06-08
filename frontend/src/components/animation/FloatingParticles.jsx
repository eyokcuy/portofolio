import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

export default function FloatingParticles() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return null;
  }

  // Generate random particles
  const particles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    duration: Math.random() * 8 + 15,
    delay: Math.random() * 5,
    left: Math.random() * 100,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${particle.opacity})`,
            filter: "blur(2px)",
          }}
          initial={{
            top: "100vh",
            opacity: 0,
          }}
          animate={{
            top: "-100px",
            opacity: [0, particle.opacity, particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        />
      ))}

      {/* Floating shapes */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute border-2 border-black"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{
            rotate: 0,
            opacity: 0.05,
          }}
          animate={{
            rotate: 360,
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: Math.random() * 15 + 20,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {i % 2 === 0 ? (
            <div className="w-12 h-12" />
          ) : (
            <div className="w-12 h-12 transform rotate-45" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
