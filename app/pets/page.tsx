import { IMenu } from "@/types/type.data.menu";
import Loader from "../def_components/loader/loader";
import "../styles/pages/pageStyle.scss";
import PetsHeroSection from "./heroSection";
import PetsBlock from "./petsBlock";
import GenericMenu from "../genercis/genericMenu";
const menuData: IMenu[] = [
  {
    item: "Главная",
    section: "/",
  },
  {
    item: "Контакты",
    section: "channels",
  }
];


export default function PetsPage() {
  return (
    <>
      <GenericMenu menuData={menuData} />
      <Loader />
      <PetsHeroSection />
      <PetsBlock />
    </>
  );
}