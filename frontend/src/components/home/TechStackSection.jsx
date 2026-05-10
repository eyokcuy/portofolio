import { motion } from "framer-motion";
import { TECH_CATEGORIES } from "../../data/techstack";
import Card from "../../ui/Card";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.25 },
  }),
};

export default function TechStackSection() {
  return (
    <section className="max-w-[1500px] mx-auto px-4 md:px-6 py-14">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
        className="bg-white border-4 border-black p-8 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
      >
        <motion.div variants={cardVariants}>
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-none">
            Tech Stack
          </h2>
          <p className="mt-4 text-lg font-bold opacity-80 max-w-xl">
            Technologies I use daily to build modern, production-ready
            applications.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {TECH_CATEGORIES.map((cat) => (
            <motion.div key={cat.category} variants={cardVariants}>
              <Card
                className="bg-[#f5f5f0] h-full"
                hoverRotate={-1}
                hoverScale={1.01}
                shadowSize="6px"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-block w-3 h-3 bg-black" />
                  <p className="font-black uppercase text-sm">{cat.category}</p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {cat.items.map((tech, i) => (
                    <motion.span
                      key={tech.name}
                      custom={i}
                      variants={badgeVariants}
                      whileHover={{
                        scale: 1.08,
                        rotate: i % 2 === 0 ? -3 : 3,
                      }}
                      className={`${tech.color} px-3 py-1.5 border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
