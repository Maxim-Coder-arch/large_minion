// app/kittens/page.js
import { IMenu } from "@/types/type.data.menu";
import Loader from "../def_components/loader/loader";
import GenericMenu from "../genercis/genericMenu";
import TemplateKittens from "../genercis/templateKittens";
import db from "@/lib/db";
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

export default async function Page() {

  const kittens = await db.getAll('kittens');

  return <>
    <GenericMenu menuData={menuData} />
    {/* <Loader /> */}
    <TemplateKittens data={kittens} url="kittens" />
  </>;
}