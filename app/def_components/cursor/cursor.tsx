'use client';
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, MotionValue } from "framer-motion";

const Cursor = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cursorX: MotionValue<number> = useMotionValue(-100);
  const cursorY: MotionValue<number> = useMotionValue(-100);
  const springConfig = { damping: 20, stiffness: 250 };
  const cursorXSpring: MotionValue<number> = useSpring(cursorX, springConfig);
  const cursorYSpring: MotionValue<number> = useSpring(cursorY, springConfig);
  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchDevice) {
      setTimeout(() => {
        setIsVisible(false);
      }, 0);
      return;
    }
    const moveCursor = (e: MouseEvent): void => {
      cursorX.set(e.pageX - 12);
      cursorY.set(e.pageY - 12);
      setIsVisible(true);
      setIsMoving(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => setIsMoving(false), 100);
    };

    const handleMouseOver = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.closest('[role="button"]') !== null ||
        target.closest('.target-action') !== null ||
        target.closest('Link') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';
      setIsHovering(isClickable);
    };
    const handleMouseLeave = (): void => {
      setIsVisible(false);
    };
    const handleMouseEnter = (): void => {
      setIsVisible(true);
    };
    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [cursorX, cursorY]);
  if (isHovering) return null;

  return (
    <motion.div
      className="custom-cursor"
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
        opacity: isVisible ? (isMoving ? 1 : 0) : 0,
      }}
      animate={{
        scale: isMoving ? 1 : 0.8,
      }}
      transition={{
        scale: { duration: 0.2 }
      }}
    />
  );
};

export default Cursor;