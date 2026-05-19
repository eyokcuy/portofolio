import { motion } from "framer-motion";
import Card from "../../ui/Card";
import { useEffect, useState, useCallback } from "react";
import { getStats, getProjects } from "../../lib/api";

const DEFAULT_COLORS = ["#67e8f9", "#fde047", "#f9a8d4", "#86efac"];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
    },
  }),
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function StatsSection() {
  const [allStats, setAllStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [statsRes, projectsRes] = await Promise.all([
        getStats(),
        getProjects(),
      ]);
      const manualStats = statsRes.data || [];
      const projectCount = projectsRes.data?.length ?? 0;

      const projectCard = {
        id: "auto-projects",
        num: `${projectCount}+`,
        label: "Projects",
        accent: "#fde047",
      };

      const combined = [
        ...manualStats.slice(0, 1),
        projectCard,
        ...manualStats.slice(1),
      ];

      setAllStats(combined);
    } catch {
      setAllStats([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // SSE for real-time updates
  useEffect(() => {
    const esStats = new EventSource("http://localhost:3000/stats/events");
    const esProjects = new EventSource("http://localhost:3000/projects/events");

    const listener = () => fetchData();

    esStats.addEventListener("stats_changed", listener);
    esProjects.addEventListener("project_changed", listener);

    return () => {
      esStats.close();
      esProjects.close();
    };
  }, [fetchData]);

  if (loading) return null;
  if (allStats.length === 0) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={stagger}
      className="max-w-[1500px] mx-auto px-4 md:px-6 py-10"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {allStats.map(({ num, label, id, accent }, i) => (
          <motion.div key={id || label} custom={i} variants={fadeUp}>
            <Card
              hoverRotate={i % 2 === 0 ? -2 : 2}
              hoverScale={1.03}
              className="h-full"
              shadowSize="8px"
              style={{
                backgroundColor:
                  accent || DEFAULT_COLORS[i % DEFAULT_COLORS.length],
              }}
            >
              <h3 className="text-4xl md:text-5xl font-black text-black">
                {num}
              </h3>
              <p className="mt-2 font-bold uppercase text-sm text-black/70">
                {label}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
