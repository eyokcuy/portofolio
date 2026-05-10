// src/components/Footer.jsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaArrowUp,
} from "react-icons/fa";

const socialLinks = [
  {
    name: "Github",
    href: "#",
    icon: <FaGithub />,
    bg: "bg-neutral-100",
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: <FaLinkedinIn />,
    bg: "bg-blue-400",
  },
  {
    name: "Instagram",
    href: "#",
    icon: <FaInstagram />,
    bg: "bg-pink-400",
  },
  {
    name: "Twitter",
    href: "#",
    icon: <FaTwitter />,
    bg: "bg-cyan-300",
  },
];

const navLinks = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "About",
    to: "/about",
  },
  {
    name: "Projects",
    to: "/projects",
  },
  {
    name: "Contact",
    to: "/contact",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-yellow-300 border-t-[5px] border-black">
      {/* DECORATION */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-400 border-[5px] border-black rotate-12" />

      <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-300 border-[5px] border-black -rotate-12" />

      <div className="max-w-[1500px] mx-auto px-4 md:px-6 py-16 relative z-10">
        {/* TOP */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* BRAND */}
          <div>
            <motion.div
              whileHover={{
                rotate: -2,
                y: -4,
              }}
              className="
                inline-block
                bg-black
                text-yellow-300
                border-[5px] border-black
                px-6 py-4
                shadow-[10px_10px_0px_#000]
              "
            >
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                More Information
              </h2>
            </motion.div>

            <p className="mt-7 max-w-md text-lg font-bold leading-relaxed text-black">
              Fullstack developer focused on building modern web applications
              with clean backend architecture, interactive frontend experiences,
              and scalable systems using React, TailwindCSS, NestJS, PHP, and
              modern web technologies.
            </p>

            <div className="flex gap-3 mt-8 flex-wrap">
              <div className="bg-white border-4 border-black px-4 py-2 font-black uppercase text-xs shadow-[4px_4px_0px_#000]">
                React
              </div>

              <div className="bg-cyan-300 border-4 border-black px-4 py-2 font-black uppercase text-xs shadow-[4px_4px_0px_#000]">
                Tailwind
              </div>
              <div className="bg-pink-300 border-4 border-black px-4 py-2 font-black uppercase text-xs shadow-[4px_4px_0px_#000]">
                Framer Motion
              </div>
            </div>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="text-3xl font-black uppercase mb-6 text-black">
              Navigation
            </h3>

            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  whileHover={{
                    x: 8,
                    rotate: index % 2 === 0 ? -2 : 2,
                  }}
                  transition={{ duration: 0.15 }}
                >
                  <Link
                    to={link.to}
                    className="
                      inline-flex items-center gap-2
                      bg-white
                      border-[4px] border-black
                      px-5 py-3
                      font-black uppercase
                      shadow-[6px_6px_0px_#000]
                      hover:shadow-[2px_2px_0px_#000]
                      hover:translate-x-[3px]
                      hover:translate-y-[3px]
                      transition-all duration-150
                    "
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="text-3xl font-black uppercase mb-6 text-black">
              Social
            </h3>

            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{
                    rotate: index % 2 === 0 ? -4 : 4,
                    y: -4,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className={`
                    ${social.bg}
                    w-16 h-16
                    flex items-center justify-center
                    text-2xl text-black
                    border-[4px] border-black
                    rounded-2xl
                    shadow-[6px_6px_0px_#000]
                    transition-all duration-150
                    hover:shadow-[2px_2px_0px_#000]
                    hover:translate-x-[3px]
                    hover:translate-y-[3px]
                  `}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            <motion.div
              whileHover={{
                rotate: -1,
                y: -3,
              }}
              className="
                mt-8
                bg-pink-400
                border-[5px] border-black
                p-5
                shadow-[8px_8px_0px_#000]
              "
            >
              <p className="font-black uppercase text-sm tracking-wide">
                Available For Freelance Work
              </p>

              <p className="mt-2 font-bold text-black">
                Open for modern websites, UI systems, and creative frontend
                projects.
              </p>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM */}
        <div
          className="
            mt-14 pt-8
            border-t-[5px] border-black
            flex flex-col md:flex-row
            items-start md:items-center
            justify-between
            gap-5
          "
        >
          <p className="font-black uppercase text-sm md:text-base text-black">
            © 2026 Rahmateyokkk
          </p>

          <motion.button
            whileHover={{
              y: -3,
              rotate: -4,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="
              bg-black
              text-yellow-300
              border-[4px] border-black
              px-5 py-3
              flex items-center gap-3
              font-black uppercase
              shadow-[6px_6px_0px_#000]
            "
          >
            Back To Top
            <FaArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
