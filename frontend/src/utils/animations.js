// Reusable animation variants - optimized & deduplicated

// ============================================
// ENTRANCE ANIMATIONS (Scroll-triggered)
// ============================================

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const slideInFromLeft = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideInFromRight = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const rotateIn = {
  hidden: { opacity: 0, rotate: -10, scale: 0.95 },
  show: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ============================================
// CONTAINER & STAGGER ANIMATIONS
// ============================================

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// ============================================
// CONTINUOUS ANIMATIONS (loops)
// ============================================

// Gentle floating motion (realistic)
export const floatSlow = {
  initial: { y: 0 },
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Alias for floatSlow (commonly used shorthand)
export const float = floatSlow;

// Pulsing opacity (subtle breathing effect)
export const pulse = {
  initial: { opacity: 1 },
  animate: {
    opacity: [1, 0.7, 1],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Subtle swing/rock motion
export const swing = {
  initial: { rotate: 0 },
  animate: {
    rotate: [0, -2, 2, -2, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Subtle bounce (up-down shorter than float)
export const bounce = {
  initial: { y: 0 },
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 2.4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Smooth rotating glow
export const glowPulse = {
  initial: { boxShadow: "0px 0px 0px 0px rgba(59, 130, 246, 0.5)" },
  animate: {
    boxShadow: [
      "0px 0px 0px 0px rgba(59, 130, 246, 0.5)",
      "0px 0px 20px 10px rgba(59, 130, 246, 0.2)",
      "0px 0px 0px 0px rgba(59, 130, 246, 0.5)",
    ],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ============================================
// INTERACTIVE HOVER ANIMATIONS (Spring physics)
// ============================================

export const hoverLift = {
  whileHover: {
    y: -8,
    boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.2)",
  },
  transition: { type: "spring", stiffness: 300, damping: 20 },
};

export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 400, damping: 10 },
};

// ============================================
// EXPAND/COLLAPSE ANIMATIONS
// ============================================

export const expandHeight = {
  hidden: { height: 0, opacity: 0 },
  show: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

// ============================================
// VIEWPORT SETTINGS
// ============================================

export const viewportSettings = {
  once: true,
  amount: 0.25,
};

export const viewportSettingsLoose = {
  once: true,
  amount: 0.1,
};
