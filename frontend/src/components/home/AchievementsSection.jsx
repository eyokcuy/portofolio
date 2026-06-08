import { motion } from "framer-motion";
import { ACHIEVEMENTS, STATS } from "../../data/achievements";
import { staggerContainer, itemVariants } from "../../utils/animations";

export default function AchievementsSection() {
  return (
    <section className="max-w-[1500px] mx-auto px-4 md:px-6 py-14">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-10"
      >
        {/* Stats Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="bg-black border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]"
            >
              <p className="text-3xl mb-2">{stat.icon}</p>
              <p className="text-white text-xs font-black uppercase opacity-80 mb-2">
                {stat.label}
              </p>
              <p className="text-white text-4xl font-black">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements/Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border-4 border-black p-8 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black uppercase leading-none mb-4"
          >
            Certifications & Achievements
          </motion.h2>
          <p className="font-bold opacity-80 max-w-2xl mb-10">
            Continuous learning and professional development to stay at the
            forefront of web development trends.
          </p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {ACHIEVEMENTS.map((achievement) => (
              <motion.div
                key={achievement.id}
                variants={itemVariants}
                whileHover={{ y: -8, rotate: -1 }}
                className={`${achievement.color} border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-300`}
              >
                <div className="flex justify-between items-start mb-4">
                  <p className="text-3xl">{achievement.icon}</p>
                  <p className="text-xs font-black uppercase opacity-60">
                    {achievement.date}
                  </p>
                </div>

                <h3 className="text-lg font-black uppercase mb-2 leading-tight">
                  {achievement.title}
                </h3>

                <p className="text-xs font-bold opacity-80 mb-3">
                  {achievement.issuer}
                </p>

                <p className="text-sm font-bold leading-tight">
                  {achievement.description}
                </p>

                {/* Animated underline */}
                <motion.div
                  className="mt-4 h-1 bg-black origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
