// src/data/projects.js

export const PROJECTS = [
  {
    id: 1,
    title: "Dashboard UI",
    color: "bg-cyan-300",
    tags: [
      { label: "React", color: "bg-yellow-300" },
      { label: "Tailwind", color: "bg-pink-300" },
    ],
    desc: "Modern brutalist interface with responsive layout and strong visual identity.",
  },

  {
    id: 2,
    title: "E-Commerce",
    color: "bg-pink-300",
    tags: [
      { label: "Next.js", color: "bg-cyan-300" },
      { label: "Stripe", color: "bg-yellow-300" },
    ],
    desc: "Full-stack shop with cart, checkout, and inventory management.",
  },

  {
    id: 3,
    title: "Blog Platform",
    color: "bg-yellow-200",
    tags: [
      { label: "Remix", color: "bg-pink-300" },
      { label: "MDX", color: "bg-cyan-300" },
    ],
    desc: "Content-first platform with dark mode and RSS feed support.",
  },
];
