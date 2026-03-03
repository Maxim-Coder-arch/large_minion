'use client';
import { IPost, postsData } from "@/app/data/posts/posts.data";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const data: IPost[] = postsData.slice(0, 4);
const SecondPetsSection = () => {
    const targetPoint = useRef(null);
    const isViewElementVisible = useInView(targetPoint, { once: true, amount: .2 });
    return (
      <>
      <div className="pets-posts">
        <h3 className="pets-main-title">посты</h3>
        <Link href="/posts">Смотреть все посты</Link>
      </div>
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
                  src={pet.image}
                  alt={pet.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="pet-image"
                  priority={index < 2}
                />
              </div>
              <span>{pet.title}</span>
            </motion.div>
          ))}
        </div>
      </>
    )
}

export default SecondPetsSection