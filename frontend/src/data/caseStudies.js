// src/data/caseStudies.js
export const CASE_STUDIES = [
  {
    id: 1,
    title: "E-Commerce Platform Redesign",
    category: "Web Application",
    description:
      "Complete redesign of an e-commerce platform resulting in 45% increase in conversion rate",
    challenge:
      "The existing platform had high bounce rates and poor user experience, especially on mobile devices.",
    solution:
      "Implemented modern React components, optimized performance, and redesigned the checkout flow for better user engagement.",
    results: [
      "45% increase in conversion rate",
      "60% faster page load times",
      "95+ Google Lighthouse score",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
    color: "bg-cyan-300",
    icon: "🛒",
  },
  {
    id: 2,
    title: "Real-Time Collaboration Tool",
    category: "Full-Stack Application",
    description: "Built a real-time project management tool used by 500+ teams",
    challenge:
      "Required real-time synchronization between multiple users, complex state management, and secure data handling.",
    solution:
      "Developed using WebSockets for real-time updates, Redux for state management, and JWT authentication.",
    results: ["500+ active users", "99.9% uptime", "Sub-100ms real-time sync"],
    technologies: ["React", "Node.js", "WebSocket", "PostgreSQL"],
    color: "bg-pink-300",
    icon: "🤝",
  },
  {
    id: 3,
    title: "Mobile App for Fitness Tracking",
    category: "React Native Application",
    description: "Cross-platform fitness tracking app with 10,000+ downloads",
    challenge:
      "Needed to work seamlessly on both iOS and Android with offline capability and smooth animations.",
    solution:
      "Created with React Native, integrated with health APIs, and implemented offline-first architecture.",
    results: [
      "10,000+ downloads",
      "4.8/5 app store rating",
      "Offline-first functionality",
    ],
    technologies: ["React Native", "Firebase", "HealthKit/Google Fit"],
    color: "bg-green-300",
    icon: "💪",
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    category: "Data Visualization",
    description:
      "Enterprise analytics dashboard handling real-time data visualization",
    challenge:
      "Needed to display complex data from multiple sources with real-time updates and complex filtering.",
    solution:
      "Built with Recharts for visualization, WebSocket for real-time updates, and optimized data queries.",
    results: [
      "Real-time data updates",
      "60+ interactive charts",
      "Complex filtering & drill-down",
    ],
    technologies: ["React", "Recharts", "Node.js", "PostgreSQL"],
    color: "bg-yellow-300",
    icon: "📊",
  },
];
