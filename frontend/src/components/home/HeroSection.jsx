import { motion, useReducedMotion } from "framer-motion";
import Button from "../../ui/Button";
import Badge from "../../ui/Badge";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import { fadeUp, floatSlow } from "../../utils/animations";

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HeroSection() {
  const prefersReduced = useReducedMotion();

  // Respect user's motion preferences: skip looping animations.
  const loop = prefersReduced
    ? {}
    : {
        animate: {
          rotate: [0, 5, -5, 0],
          y: [0, -10, 10, 0],
        },
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      };

  const loop2 = prefersReduced
    ? {}
    : {
        animate: {
          rotate: [0, -5, 5, 0],
          x: [0, 10, -10, 0],
        },
        transition: {
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      };

  const availableLoop = prefersReduced
    ? {}
    : {
        animate: {
          y: [0, -2, 0],
        },
        transition: {
          duration: 2,
          repeat: Infinity,
        },
      };

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={stagger}
      className="max-w-[1500px] mx-auto px-4 md:px-6 py-10"
    >
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* LEFT */}
        <motion.div variants={stagger}>
          <motion.div variants={fadeUp}>
            <Badge variant="black" className="mb-5">
              Junior web Developer
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tight text-black"
          >
            Wellcome
            <br />
            To my
            <br />
            Portfolio
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg md:text-xl font-bold leading-relaxed max-w-xl text-black"
          >
            Building fast, modern, and expressive digital experiences with React
            + TailwindCSS—crafted to feel{" "}
            <span className="font-black">tactile</span>, accessible, and ready
            for real users (not just screenshots).
          </motion.p>

          <motion.ul
            variants={stagger}
            className="mt-6 grid gap-2 text-base md:text-lg font-bold text-black"
          >
            {[
              "Performance-minded UI",
              "Clean component architecture",
              "Accessible-by-default",
              "Neo‑Brutalism, but professional",
            ].map((t, index) => (
              <motion.li
                key={t}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
              >
                <motion.div
                  className="mt-1 flex items-center justify-center w-5 h-5 bg-yellow-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[10px] shrink-0"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <FiCheck className="stroke-[4]" />
                </motion.div>
                <motion.span
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {t}
                </motion.span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-8">
            <Button variant="black" className="flex items-center gap-2">
              View Work <FiArrowRight />
            </Button>
            <Button variant="white">Contact Me</Button>
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <motion.div variants={fadeUp} className="relative">
          <motion.div variants={floatSlow} initial="initial" animate="animate">
            <motion.div
              whileHover={{
                scale: 1.05,
                rotate: -3,
                boxShadow: "16px 16px 0px 0px rgba(0,0,0,1)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="aspect-square border-4 border-black bg-cyan-300
                         shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
                         flex items-center justify-center overflow-hidden"
            >
              <img
                src="/img/p.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Decorative animated squares */}
          <motion.div
            className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-300 border-4 border-black"
            {...loop}
          />

          <motion.div
            className="absolute -bottom-6 -left-6 w-16 h-16 bg-pink-300 border-4 border-black"
            {...loop2}
          />

          <motion.div
            animate={
              prefersReduced
                ? {}
                : {
                    rotate: [-2, 2, -2],
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute bottom-4 left-4 bg-pink-400 border-4 border-black px-5 py-3
                       shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <motion.p
              className="font-black uppercase text-sm"
              {...availableLoop}
            >
              Available For Freelance
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
