'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import Loader from "@/app/def_components/loader/loader";
import { ANIMATION_CONFIG } from "@/configs/hero";
import { CONTENT_ANIMATION_DELAYS } from "@/configs/hero";


const HeroSection = () => {
  return (
    <section id="main-section">
      <Loader />
      <div className="main-section-bg-1"></div>
      <div className="main-section">
        <div className="main-section-content">
          <motion.span
            {...ANIMATION_CONFIG.fadeInUp(CONTENT_ANIMATION_DELAYS.quote)}
          >
            Имеющий глаза да увидит...
          </motion.span>
          
          <motion.h1
            {...ANIMATION_CONFIG.fadeInUp(CONTENT_ANIMATION_DELAYS.title)}
          >
            Монопородный питомник мейн кунов
          </motion.h1>
          
          <motion.div 
            className="main-advantages"
            {...ANIMATION_CONFIG.fadeInUp(CONTENT_ANIMATION_DELAYS.advantages)}
          >
            <span>Хорошие цены</span>
            <span>Доставка</span>
            <span>Хороший уход</span>
          </motion.div>
          
          <Link className="target-action" href="#">
            <motion.div 
              className="target-action-button"
              {...ANIMATION_CONFIG.fadeInUp(CONTENT_ANIMATION_DELAYS.button)}
            />
            <motion.span
              {...ANIMATION_CONFIG.fadeInUp(CONTENT_ANIMATION_DELAYS.buttonText)}
            >
              Хочу котика
            </motion.span>
          </Link>
        </div>

        <motion.div 
          className="main-section-bg-2"
          {...ANIMATION_CONFIG.fadeInUpLarge}
        />

        <div className="main-section-cards">
          <div className="section-cards">
            <motion.div 
              className="main-section-card msc-1"
              {...ANIMATION_CONFIG.cardAnimation(CONTENT_ANIMATION_DELAYS.card1)}
            />
            <motion.div 
              className="main-section-card msc-2"
              {...ANIMATION_CONFIG.cardAnimation(CONTENT_ANIMATION_DELAYS.card2)}
            />
          </div>
          
          <motion.div 
            className="title-section-cards"
            {...ANIMATION_CONFIG.cardAnimation(CONTENT_ANIMATION_DELAYS.cardTitle)}
          >
            <span>Elvis</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;