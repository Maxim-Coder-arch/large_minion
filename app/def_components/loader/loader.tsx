'use client';
import { motion, Variants } from "framer-motion";
import { useState } from "react";

interface LoadLineProps {
  direction: 'up' | 'down';
}
const VARIANTS: {
  lineLoader: Variants;
  loadLine: (props: LoadLineProps | { direction: 'up' | 'down' }) => Variants;
  container: Variants;
} = {
  lineLoader: {
    hidden: { 
      width: 0,
      opacity: 1 
    },
    visible: { 
      width: "100%",
      opacity: 0,
      transition: {
        width: { 
          duration: 0.7,
          ease: "easeOut"
        },
        opacity: { 
          delay: 0.6, 
          duration: 0.5,
          ease: "easeIn"
        }
      }
    }
  },
  loadLine: ({ direction }) => ({
    hidden: { y: 0 },
    visible: { 
      y: direction === 'up' ? '-100%' : '100%',
      transition: {
        duration: 0.6,
        delay: 1.2,
        ease: "easeInOut"
      }
    }
  }),
  container: {
    hidden: { opacity: 1 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }
};
const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const handleAnimationComplete = () => {
    setTimeout(() => {
      setIsVisible(false);
    }, 1000);
  };
  if (!isVisible) return null;
  return (
    <motion.div 
      className="loader"
      initial="hidden"
      animate="visible"
      variants={VARIANTS.container}
      onAnimationComplete={handleAnimationComplete}
    >
      <motion.div 
        className="load load-1"
        variants={VARIANTS.loadLine({ direction: 'up' })}
      />
      <motion.div 
        className="line-loader"
        variants={VARIANTS.lineLoader}
      />
      <motion.div 
        className="load load-2"
        variants={VARIANTS.loadLine({ direction: 'down' })}
      />
    </motion.div>
  );
};

export default Loader;