import HeroSection from "./components/hero_section";
import About from "./components/main/about";
import Articles from "./components/main/articles";
import Faq from "./components/main/faq";
import Pets from "./components/main/pets";
import Menu from "./def_components/menu/menu";
import MessageBox from "./def_components/message/messageBox";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  return (
    <>
      <Menu />
      <HeroSection />
      <Pets />
      <Articles />
      <About />
      <Faq />
      <MessageBox />
    </>
  );
}


