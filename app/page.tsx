import HeroSection from "./components/hero_section";
import About from "./components/main/about";
import Articles from "./components/main/articles";
import Pets from "./components/main/pets";
import Menu from "./def_components/menu/menu";

export default function Home() {
  return (
    <>
      <Menu />
      <HeroSection />
      <Pets />
      <Articles />
      <About />
    </>
  );
}
