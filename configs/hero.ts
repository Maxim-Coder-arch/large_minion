import { MotionProps, Variants } from "framer-motion";
type AnimationProps = MotionProps;
type VariantsProps = Variants;
export const ANIMATION_CONFIG = {
  fadeInUp: (customDelay: number = 0, yOffset: number = 50): AnimationProps => ({
    initial: { 
      opacity: 0, 
      y: yOffset 
    },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: customDelay,
        ease: "easeInOut"
      }
    },
    viewport: { once: true, amount: 0.3 }
  }),
  fadeInUpLarge: {
    initial: { 
      opacity: 0, 
      y: "100px" 
    },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        delay: 1.7,
        ease: "easeInOut"
      }
    },
    viewport: { once: true, amount: 0.3 }
  } satisfies AnimationProps,
  staggerContainer: (staggerChildren: number = 0.2, delayChildren: number = 1.5): VariantsProps => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      }
    }
  }),

  staggerItem: (yOffset: number = 50): VariantsProps => ({
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

  cardAnimation: (delay: number): AnimationProps => ({
    initial: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    whileInView: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay,
        ease: "easeInOut"
      }
    },
    viewport: { once: true, amount: 0.2 }
  }),
  fadeInLeft: (delay: number = 0): AnimationProps => ({
    initial: { 
      opacity: 0, 
      x: -50 
    },
    whileInView: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: "easeInOut"
      }
    },
    viewport: { once: true, amount: 0.3 }
  }),

  fadeInRight: (delay: number = 0): AnimationProps => ({
    initial: { 
      opacity: 0, 
      x: 50 
    },
    whileInView: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: "easeInOut"
      }
    },
    viewport: { once: true, amount: 0.3 }
  }),
  scaleIn: (delay: number = 0): AnimationProps => ({
    initial: { 
      opacity: 0, 
      scale: 0.8 
    },
    whileInView: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        delay,
        ease: "easeInOut"
      }
    },
    viewport: { once: true, amount: 0.3 }
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