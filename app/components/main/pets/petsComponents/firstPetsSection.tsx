'use client';
import { IPet } from "@/types/type.data.pets";
import { petsData } from "../petsData/pets.data";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const FirstPetsSection = () => {
  const [showData, setShowData] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const targetPoint = useRef(null);
  const isViewElementVisible = useInView(targetPoint, { once: true, amount: .5 });
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1050);
      setIsSmallScreen(window.innerWidth <= 510);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const data: IPet[] = petsData.slice(0, isMobile ? 2 : 3);
  
  // На маленьких экранах показываем статичный div без анимации
  if (isSmallScreen) {
    return (
      <>
        <div className="pets-navigation">
          <h3 className="pets-main-title">наши питомцы</h3>
          <Link href="/pets">Смотреть всех</Link>
        </div>
        <div className="first-pets-section" ref={targetPoint}>
          <div className="first-pets-section-image" />
          <div className="first-pets-section-data">
            {data.map((pet, index) => (
              <motion.div 
              initial={{
                opacity: 0,
                y: 50
              }}
              animate={isViewElementVisible ? {
                opacity: 1,
                y: 0
              } : {}}
              transition={{
                delay: .1 * index,
                ease: "easeOut"
              }}
              key={index} 
              className="first-pets-section-data-card">
                <div className="image-wrapper">
                  <Image
                    src={pet.portait}
                    alt={pet.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="pet-image"
                    priority={index < 2}
                  />
                </div>
                <span>{pet.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </>
    );
  }
  
  // Для больших экранов показываем версию с анимацией
  return (
    <>
      <div className="pets-navigation">
        <h3 className="pets-main-title">наши питомцы</h3>
        <Link href="/pets">Смотреть всех</Link>
      </div>
      <div className="first-pets-section" ref={targetPoint}>
        <motion.div 
        initial={{
          width: 0,
          opacity: 0
        }}
        animate={isViewElementVisible ? {
          width: "500px",
          opacity: 1
        } : {}}
        transition={{
          duration: .7
        }}
        onAnimationComplete={() => setShowData(true)}
        className="first-pets-section-image" />
        <div className="first-pets-section-data">
          {data.map((pet, index) => (
            <motion.div 
            initial={{
              opacity: 0,
              y: 50
            }}
            animate={showData && isViewElementVisible ? {
              opacity: 1,
              y: 0
            } : {}}
            transition={{
              delay: .1 * index,
              ease: "easeOut"
            }}
            key={index} 
            className="first-pets-section-data-card">
              <div className="image-wrapper">
                <Image
                  src={pet.portait}
                  alt={pet.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="pet-image"
                  priority={index < 2}
                />
              </div>
              <span>{pet.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FirstPetsSection;