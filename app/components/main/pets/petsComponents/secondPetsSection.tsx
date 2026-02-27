'use client';
import { petsData } from "../petsData/pets.data";
import Image from "next/image";
import { IPet } from "@/types/type.data.pets";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const data: IPet[] = petsData.slice(3, 7);
const SecondPetsSection = () => {

    const targetPoint = useRef(null);
    const isViewElementVisible = useInView(targetPoint, { once: true, amount: .2 });

    return (
      <div className="second-pets-section" ref={targetPoint}>
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
          className="second-pets-section-data-card">
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
    )
}

export default SecondPetsSection