import { motion } from "framer-motion";
import { useState } from "react";
import { CASE_STUDIES } from "../../data/caseStudies";
import {
  staggerContainer,
  itemVariants,
  expandHeight,
} from "../../utils/animations";
import { FiChevronDown } from "react-icons/fi";

export default function CaseStudiesSection() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
            Case Studies
          </h2>
          <p className="text-lg font-bold opacity-80 max-w-2xl">
            Real projects, real results. Explore some of the work I've done for
            clients across various industries.
          </p>
        </motion.div>

        {/* Case Studies */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-4"
        >
          {CASE_STUDIES.map((caseStudy) => (
            <motion.div
              key={caseStudy.id}
              variants={itemVariants}
              className="overflow-hidden"
            >
              <motion.button
                onClick={() => toggleExpand(caseStudy.id)}
                whileHover={{ x: 5 }}
                className={`${caseStudy.color} w-full border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all text-left group`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 items-start flex-1 min-w-0">
                    <p className="text-3xl flex-shrink-0">{caseStudy.icon}</p>
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase opacity-60 mb-1">
                        {caseStudy.category}
                      </p>
                      <h3 className="text-xl md:text-2xl font-black uppercase leading-tight mb-2">
                        {caseStudy.title}
                      </h3>
                      <p className="font-bold text-sm md:text-base line-clamp-2">
                        {caseStudy.description}
                      </p>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: expandedId === caseStudy.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 mt-2"
                  >
                    <FiChevronDown className="w-6 h-6 font-black" />
                  </motion.div>
                </div>
              </motion.button>

              {/* Expanded Content */}
              <motion.div
                initial={false}
                animate={{
                  height: expandedId === caseStudy.id ? "auto" : 0,
                  opacity: expandedId === caseStudy.id ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden border-4 border-t-0 border-black bg-white"
              >
                <motion.div className="p-6 md:p-8 space-y-6">
                  {/* Challenge */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h4 className="text-lg font-black uppercase mb-2">
                      Challenge
                    </h4>
                    <p className="font-bold text-sm md:text-base opacity-80">
                      {caseStudy.challenge}
                    </p>
                  </motion.div>

                  {/* Solution */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <h4 className="text-lg font-black uppercase mb-2">
                      Solution
                    </h4>
                    <p className="font-bold text-sm md:text-base opacity-80">
                      {caseStudy.solution}
                    </p>
                  </motion.div>

                  {/* Results */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4 className="text-lg font-black uppercase mb-3">
                      Results
                    </h4>
                    <ul className="space-y-2">
                      {caseStudy.results.map((result) => (
                        <motion.li
                          key={result}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-2 font-bold text-sm md:text-base"
                        >
                          <span className="text-lg">✓</span>
                          {result}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Technologies */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <h4 className="text-lg font-black uppercase mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.technologies.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 bg-black text-white font-bold text-sm border-2 border-black"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
