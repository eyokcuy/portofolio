// src/components/ui/SocialMedia.jsx

import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

const socials = [
  {
    name: "LinkedIn",
    icon: <FaLinkedinIn />,
    link: "https://linkedin.com/",
    bg: "bg-blue-400",
  },
  {
    name: "GitHub",
    icon: <FaGithub />,
    link: "https://github.com/",
    bg: "bg-neutral-100",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    link: "https://instagram.com/",
    bg: "bg-pink-400",
  },
  {
    name: "WhatsApp",
    icon: <FaWhatsapp />,
    link: "https://wa.me/628123456789",
    bg: "bg-green-400",
  },
];

export default function SocialMedia() {
  return (
    <div
      className="
        flex flex-row gap-4 mt-8

        lg:fixed
        lg:right-6
        lg:top-1/2
        lg:-translate-y-1/2
        lg:flex-col
        lg:mt-0

        z-49
      "
    >
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className={`
            ${social.bg}
            w-14 h-14 md:w-16 md:h-16
            flex items-center justify-center
            text-2xl md:text-3xl
            text-black
            border-[3px] border-black
            rounded-2xl
            shadow-[6px_6px_0px_#000]
            transition-all duration-150

            hover:translate-x-[3px]
            hover:translate-y-[3px]
            hover:shadow-[2px_2px_0px_#000]

            active:translate-x-[6px]
            active:translate-y-[6px]
            active:shadow-none
          `}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}
