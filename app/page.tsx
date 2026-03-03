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



/*
database

username = large_minion_database_1sxcs2d

password = large_minion_rootDs2F


large_minion_rootDs2F



connect - mongodb+srv://large_minion_database_1sxcs2d:large_minion_rootDs2F@largeminion.b2oktwa.mongodb.net/?appName=largeMinion



npm install mongodb

*/