import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const colorForIndex = (i) => {
  return i % 4 === 0
    ? "bg-yellow-300"
    : i % 4 === 1
      ? "bg-cyan-300"
      : i % 4 === 2
        ? "bg-pink-300"
        : "bg-neutral-100";
};

export default function SkillAccordion({ group, gi, isActive, onClick }) {
  const contentRef = useRef(null);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      const h = contentRef.current.scrollHeight;
      setMeasuredHeight(h);
    }
  }, [group]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        rotate: gi % 2 === 0 ? -1 : 1,
      }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: gi * 0.05,
      }}
      whileHover={{ rotate: -1, scale: 1.01 }}
      className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white"
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    >
      <div className="flex items-center justify-between gap-3 p-5">
        <div>
          <p className="font-black uppercase text-lg">{group.title}</p>
          <p className="mt-1 text-sm font-bold opacity-80">
            {isActive ? "Expanded" : "Tap to explore"}
          </p>
        </div>

        <div
          className={`min-w-[58px] h-[58px] ${group.accent} border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center`}
        >
          <span className="font-black uppercase text-xs">
            {String(gi + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: isActive ? measuredHeight : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{
          height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
        }}
        className="overflow-hidden"
      >
        <div ref={contentRef} className="px-5 pb-5 pt-2">
          <div className="mb-3 border-2 border-black bg-[#f5f5f0] p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-bold">{group.description}</p>
          </div>

          <div className="flex gap-2 flex-wrap">
            {group.items.map((skill, i) => (
              <motion.span
                key={skill}
                whileHover={{
                  rotate: i % 2 === 0 ? -3 : 2,
                  scale: 1.06,
                  translateY: -2,
                }}
                className={`px-3 py-1 border-2 border-black text-xs font-black uppercase ${colorForIndex(i)}`}
              >
                {skill}
              </motion.span>
            ))}
          </div>

          {group.extraInfo && (
            <div className="mt-3 pt-3 border-t-2 border-black">
              <p className="text-xs font-bold opacity-70">{group.extraInfo}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
