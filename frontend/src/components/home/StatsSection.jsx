import { motion } from "framer-motion";
import Card from "../../ui/Card";

const STATS = [
  { num: "5+", label: "Years Experience" },
  { num: "40+", label: "Projects" },
  { num: "20+", label: "Clients" },
  { num: "99%", label: "Satisfaction" },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function StatsSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={stagger}
      className="max-w-[1500px] mx-auto px-4 md:px-6 py-10"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map(({ num, label }, i) => (
          <motion.div key={label} variants={fadeUp}>
            <Card
              hoverRotate={i % 2 === 0 ? -2 : 2}
              hoverScale={1.03}
              className="h-full"
            >
              <h3 className="text-4xl md:text-5xl font-black">{num}</h3>
              <p className="mt-2 font-bold uppercase text-sm">{label}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
