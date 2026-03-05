'use client';
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { links } from "@/app/data/linksPage/linksPage.data";

const FirstPetsSection = () => {
  const [showData, setShowData] = useState<boolean>(false);
  const targetPoint = useRef(null);
  const isViewElementVisible = useInView(targetPoint, { once: true, amount: .5 });

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
          {links.map((pet, index) => (
            <motion.a 
            href={pet.url}
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
                  src={pet.image}
                  alt={pet.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="pet-image"
                  priority={index < 2}
                />
              </div>
              <div className="pet-bottom">
                <span>{pet.title}</span>
                <div className="target-action-button"></div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </>
  );
};

export default FirstPetsSection;