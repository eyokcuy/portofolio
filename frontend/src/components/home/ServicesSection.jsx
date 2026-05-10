import { motion } from "framer-motion";
import { SERVICES } from "../../data/services";
import Card from "../../ui/Card";

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, rotate: -1 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ServicesSection() {
  return (
    <section className="max-w-[1500px] mx-auto px-4 md:px-6 py-14">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="bg-white border-4 border-black p-8 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
      >
        <motion.div variants={fadeUp}>
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-none">
            Services
          </h2>
          <p className="mt-4 text-lg font-bold opacity-80 max-w-xl">
            Need something built, fixed, or improved? Here's what I can help
            with.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {SERVICES.map((service, i) => {
            // Explicitly define the color classes
            const colorMap = {
              "bg-yellow-300": "bg-yellow-300",
              "bg-cyan-300": "bg-cyan-300",
              "bg-pink-300": "bg-pink-300",
              "bg-green-300": "bg-green-300",
            };
            const accentColor = colorMap[service.accent] || "bg-white";

            return (
              <motion.div key={service.title} variants={fadeUp}>
                <Card
                  hoverRotate={i % 2 === 0 ? -2 : 2}
                  hoverScale={1.03}
                  className={`${accentColor} h-full`}
                  shadowSize="8px"
                >
                  <p className="text-xs font-black uppercase opacity-60">
                    Service {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-xl font-black uppercase leading-tight">
                    {service.title}
                  </h3>

                  <div className="mt-3 bg-white border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <p className="font-black text-sm">{service.price}</p>
                  </div>

                  <ul className="mt-4 grid gap-1.5">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm font-bold"
                      >
                        <span className="inline-block w-2 h-2 bg-black" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-sm font-bold text-center opacity-70"
        >
          * Prices are estimates. Final quote depends on scope & complexity.
        </motion.p>
      </motion.div>
    </section>
  );
}
