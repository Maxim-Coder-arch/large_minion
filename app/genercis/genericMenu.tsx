'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IMenu } from "@/types/type.data.menu";

const ScrollMenu = () => {
  const staticMenuData: IMenu[] = [
    {
      item: "Главная",
      section: "/",
    },
    {
      item: "Котята",
      section: "/kittens",
    },
    {
      item: "Взрослые",
      section: "/adults",
    },
    {
      item: "Выпускники",
      section: "/graduates",
    },
    {
      item: "Посты",
      section: "/posts",
    },
    {
      item: "Все питомцы",
      section: "/pets",
    },
    {
      item: "Контакты",
      section: "basement",
    }
  ];

  return (
    <motion.nav 
    initial={{
      opacity: 0,
      y: 20
    }}
    animate={{
      opacity: 1,
      y: 0
    }}
    transition={{
      ease: "easeOut"
    }}
    className="scroll-menu">
      <ul>
        {staticMenuData.map((item, index) => (
          <motion.li 
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: .05 * index,
            ease: "easeOut"
          }}
          key={index}>
            <Link href={`${item.section}`}>{item.item}</Link>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  )
}

const GenericMenu = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  const staticMenuData: IMenu[] = [
    {
      item: "Главная",
      section: "/",
    },
    {
      item: "Котята",
      section: "/kittens",
    },
    {
      item: "Взрослые",
      section: "/adults",
    },
    {
      item: "Выпускники",
      section: "/graduates",
    },
    {
      item: "Посты",
      section: "/posts",
    },
    {
      item: "Все питомцы",
      section: "/pets",
    },
    {
      item: "Контакты",
      section: "basement",
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY === 0;
      setIsScrolled(scrolled);
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 940);
      setIsMenuOpen(false);
    };
    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <>
        <button onClick={() => setIsMenuOpen(prev => !prev)} className="is-m-menu">
          {Array.from({ length: 3 }).map((_, index) => (
            <span key={index} className={`${isMenuOpen ? `active-line-${index}` : ""}`}></span>
          ))}
        </button>
        {isMenuOpen && <ScrollMenu />}
      </>
    )
  }

  return (
    isScrolled ? (
      <nav className="menu">
        <span>Large Minion</span>
        <ul>
          {staticMenuData.map((item, index) => (
            <motion.li 
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: .1 * index,
              ease: "easeOut"
            }}
            key={index}>
              <Link href={`${item.section}`}>{item.item}</Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    ) : (
      <>
        <button onClick={() => setIsMenuOpen(prev => !prev)} className="is-m-menu">
          {Array.from({ length: 3 }).map((_, index) => (
            <span key={index} className={`${isMenuOpen ? `active-line-${index}` : ""}`}></span>
          ))}
        </button>
        {isMenuOpen && <ScrollMenu />}
      </>
    )
  )
}

export default GenericMenu;