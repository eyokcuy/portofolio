import { motion, useReducedMotion } from "framer-motion";
import SocialMedia from "../../ui/SocialMedia";
import Button from "../../ui/Button";
import Badge from "../../ui/Badge";
import { FiCheck, FiArrowRight } from "react-icons/fi";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

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

  const floatAnim = prefersReduced
    ? {}
    : {
        animate: {
          y: [0, -8, 0],
        },
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
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
            variants={fadeUp}
            className="mt-6 grid gap-2 text-base md:text-lg font-bold text-black"
          >
            {[
              "Performance-minded UI",
              "Clean component architecture",
              "Accessible-by-default",
              "Neo‑Brutalism, but professional",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <div className="mt-1 flex items-center justify-center w-5 h-5 bg-yellow-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[10px] shrink-0">
                  <FiCheck className="stroke-[4]" />
                </div>
                <span>{t}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-8">
            <Button variant="black" className="flex items-center gap-2">
              View Work <FiArrowRight />
            </Button>
            <Button variant="white">Contact Me</Button>
          </motion.div>
        </motion.div>

        {/* SOCIALS */}
        <SocialMedia />

        {/* RIGHT */}
        <motion.div variants={fadeUp} className="relative">
          <motion.div {...floatAnim}>
            <motion.div
              whileHover={{
                scale: 1.02,
                rotate: -2,
              }}
              className="aspect-square border-4 border-black bg-cyan-300
                         shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
                         flex items-center justify-center"
            >
              <img src="/img/p.jpg" alt="Profile" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>

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
            <p className="font-black uppercase text-sm">
              Available For Freelance
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
