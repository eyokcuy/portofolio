import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SKILL_GROUPS, EXPERIENCES, FUN_FACTS } from "../../data/about";
import SkillAccordion from "./SkillAccordion";
import ExperienceCard from "./ExperienceCard";

export default function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const activeGroup = useMemo(() => {
    if (activeIndex === null) return null;
    return SKILL_GROUPS[activeIndex] ?? null;
  }, [activeIndex]);

  const handleToggle = useCallback((gi) => {
    setActiveIndex((prev) => (prev === gi ? null : gi));
  }, []);

  return (
    <section className="max-w-[1500px] mx-auto px-4 md:px-6 py-14">
      <div className="bg-white border-4 border-black p-8 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* LEFT COLUMN */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-none">
              About Me
            </h2>

            <p className="mt-6 text-lg font-bold leading-relaxed">
              I build <span className="font-black">loud</span>, fast, and
              reliable web interfaces—where UI feels physical, and code stays
              clean.
            </p>

            <p className="mt-4 text-lg font-bold leading-relaxed">
              My workflow combines Neo‑Brutalism aesthetics with practical
              product thinking: component-driven development, accessible
              interactions, and performance-minded UI.
            </p>

            {/* EXPERIENCE TIMELINE */}
            <div className="mt-8">
              <p className="font-black uppercase text-sm mb-3">Experience</p>
              <div className="grid gap-3">
                {EXPERIENCES.map((exp, i) => (
                  <ExperienceCard key={exp.role} exp={exp} i={i} />
                ))}
              </div>
            </div>

            {/* WHAT I CARE ABOUT */}
            <div className="mt-8 border-4 border-black bg-[#f5f5f0] p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-black uppercase">What I care about</p>
              <ul className="mt-3 grid gap-2 text-lg font-bold">
                {[
                  "Clarity in UX",
                  "Snappy tactile motion",
                  "Keyboard-friendly interactions",
                  "Maintainable React components",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-2 inline-block w-2.5 h-2.5 bg-black border-2 border-black" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FUN FACTS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 border-4 border-black bg-black text-yellow-300 p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <p className="font-black uppercase text-sm">⚡ Fun Facts</p>
              <ul className="mt-3 grid gap-2 text-sm font-bold">
                {FUN_FACTS.map((fact) => (
                  <li key={fact} className="flex items-start gap-3">
                    <span className="mt-1 inline-block w-2 h-2 bg-yellow-300" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <div className="grid gap-4">
              {SKILL_GROUPS.map((group, gi) => (
                <SkillAccordion
                  key={group.title}
                  group={group}
                  gi={gi}
                  isActive={gi === activeIndex}
                  onClick={() => handleToggle(gi)}
                />
              ))}

              <div className="bg-[#f5f5f0] border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-black uppercase">Selected</p>
                <p className="mt-2 font-black text-lg">
                  {activeGroup?.title ?? "None"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
