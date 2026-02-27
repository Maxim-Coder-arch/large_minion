import { Variants } from "framer-motion";

export const ANIMATION_CONFIG = {
  fadeInUp: (customDelay: number = 0, yOffset: number = 50) => ({
    initial: { 
      opacity: 0, 
      y: yOffset 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: customDelay,
        ease: "easeInOut"
      }
    }
  }),
  fadeInUpLarge: {
    initial: { 
      opacity: 0, 
      y: "100px" 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        delay: 1.7,
        ease: "easeInOut"
      }
    }
  },
  staggerContainer: (staggerChildren: number = 0.2, delayChildren: number = 1.5): Variants => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      }
    }
  }),
  staggerItem: (yOffset: number = 50): Variants => ({
    hidden: { 
      opacity: 0, 
      y: yOffset 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  }),
  cardAnimation: (delay: number) => ({
    initial: { 
      opacity: 0, 
      y: 50 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: "easeInOut"
      }
    }
  })
} as const;

export const CONTENT_ANIMATION_DELAYS = {
  quote: 1.5,
  title: 1.7,
  advantages: 1.9,
  button: 2.1,
  buttonText: 2.3,
  bg2: 1.7,
  card1: 1.7,
  card2: 1.9,
  cardTitle: 2.1
} as const;