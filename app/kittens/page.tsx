import { IMenu } from "@/types/type.data.menu";
import { kittensData } from "../data/kittens/kittens.data";
import Loader from "../def_components/loader/loader";
import GenericMenu from "../genercis/genericMenu";
import TemplateKittens from "../genercis/templateKittens";

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

export default function Page() {
  return <>
    <GenericMenu menuData={menuData} />
    <Loader />
    <TemplateKittens data={kittensData} url="kittens" />
  </>;
}