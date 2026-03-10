'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IMenu } from "@/types/type.data.menu";
import { usePathname } from "next/navigation";

const ScrollMenu = ({ menuData, pathname }: { menuData: IMenu[], pathname: string }) => {
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
      className="scroll-menu"
    >
      <ul>
        {menuData.map((item, index) => {
          const isActive = pathname === item.section || 
                          (item.section !== '/' && pathname?.startsWith(item.section));
          
          return (
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
              key={index}
              className={isActive ? 'active-menu-item' : ''}
            >
              <Link href={item.section === 'basement' ? '#basement' : item.section}>
                {item.item}
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </motion.nav>
  );
};

const GenericMenu = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const pathname = usePathname();
  
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
      const scrolled = window.scrollY > 50;
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
  const showMobileVersion = isMobile || isScrolled;
  if (showMobileVersion) {
    return (
      <>
        <button 
          onClick={() => setIsMenuOpen(prev => !prev)} 
          className={`is-m-menu ${isMenuOpen ? 'active' : ''} ${!isMobile && isScrolled ? 'desktop-scrolled' : ''}`}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <span key={index} className={isMenuOpen ? `active-line-${index}` : ""}></span>
          ))}
        </button>
        {isMenuOpen && <ScrollMenu menuData={staticMenuData} pathname={pathname} />}
      </>
    );
  }
  return (
    <nav className={`menu`}>
      <span>Large Minion</span>
      <ul>
        {staticMenuData.map((item, index) => {
          const isActive = pathname === item.section || 
                          (item.section !== '/' && pathname?.startsWith(item.section));
          
          return (
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
              className={isActive ? "active-point-menu" : ""}
              key={index}
            >
              <Link href={item.section === 'basement' ? '#basement' : item.section}>
                {item.item}
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
};

export default GenericMenu;