import { motion } from "framer-motion";
import { FiArrowRight, FiMail, FiPhone } from "react-icons/fi";
import SplitText from "../animation/SplitText";

export default function CallToActionSection() {
  return (
    <section className="max-w-[1500px] mx-auto px-4 md:px-6 py-14">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative overflow-hidden"
      >
        {/* Background animated shapes */}
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-300 border-4 border-black rounded-full opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-300 border-4 border-black rounded-full opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="bg-black border-4 border-black p-12 md:p-16 shadow-[16px_16px_0px_0px_rgba(0,0,0,0.3)] relative z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Content */}
          <div className="text-center space-y-8">
            {/* Heading with SplitText animation */}
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight text-white mb-4">
                <span className="text-white">
                  <SplitText text="Ready to" />
                </span>
                <br />
                <motion.span
                  className="inline-block bg-gradient-to-r from-yellow-300 to-pink-300 text-black px-4 py-2 rotate-2"
                  animate={{ rotate: [2, -2, 2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Level Up?
                </motion.span>
              </h2>
            </div>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl font-bold text-white opacity-90 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Let's create something amazing together. Whether you have a
              project in mind or just want to chat about possibilities, I'm here
              to help.
            </motion.p>

            {/* Contact methods */}
            <motion.div
              className="flex flex-col md:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {[
                {
                  icon: FiMail,
                  label: "Email Me",
                  href: "mailto:contact@example.com",
                },
                { icon: FiPhone, label: "Call Me", href: "tel:+1234567890" },
              ].map((method, i) => {
                const Icon = method.icon;
                return (
                  <motion.a
                    key={i}
                    href={method.href}
                    whileHover={{ scale: 1.08, rotate: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-yellow-300 text-black font-black uppercase border-4 border-white flex items-center gap-2 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]"
                  >
                    <Icon className="w-5 h-5" />
                    {method.label}
                  </motion.a>
                );
              })}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 30px 10px rgba(251, 191, 36, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-white text-black font-black uppercase text-lg border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)] flex items-center gap-3 mx-auto"
              >
                Start Your Project
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <FiArrowRight className="w-6 h-6" />
                </motion.span>
              </motion.button>
            </motion.div>

            {/* Floating decorative elements */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`float-${i}`}
                className="absolute text-4xl"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${10 + i * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              >
                {["⭐", "✨", "🚀"][i]}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
