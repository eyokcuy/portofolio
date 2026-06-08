import { motion } from "framer-motion";
import { PROCESS_STEPS } from "../../data/process";
import {
  staggerContainer,
  itemVariants,
  hoverLift,
} from "../../utils/animations";

export default function ProcessSection() {
  return (
    <section className="max-w-[1500px] mx-auto px-4 md:px-6 py-14">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-white border-4 border-black p-8 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-none mb-4">
            My Process
          </h2>
          <p className="text-lg font-bold opacity-80 max-w-2xl">
            A structured approach to delivering high-quality projects on time.
            From discovery to deployment, every step is carefully planned.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-6"
        >
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="relative"
            >
              {/* Connecting line (except last) */}
              {index < PROCESS_STEPS.length - 1 && (
                <div className="absolute left-12 top-24 w-1 h-12 bg-black opacity-20" />
              )}

              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={`${step.accent} border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300`}
              >
                <div className="flex gap-6">
                  {/* Step number and icon */}
                  <div className="flex flex-col items-center min-w-fit">
                    <div className="text-4xl mb-2">{step.icon}</div>
                    <div className="text-xs font-black uppercase opacity-60">
                      Step {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-black uppercase mb-2">
                      {step.title}
                    </h3>
                    <p className="font-bold mb-4 text-sm md:text-base">
                      {step.description}
                    </p>

                    {/* Details as bullets */}
                    <motion.ul
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="grid gap-2"
                    >
                      {step.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2 text-sm font-bold"
                        >
                          <span className="text-lg leading-none mt-0.5">→</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </motion.ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t-4 border-black text-center"
        >
          <p className="font-bold text-lg mb-4">
            Ready to get your project started?
          </p>
          <motion.button
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-black text-white font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] transition-shadow"
          >
            Let's Talk
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
