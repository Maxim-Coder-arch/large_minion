// app/kittens/page.js
import { IMenu } from "@/types/type.data.menu";
import Loader from "../def_components/loader/loader";
import GenericMenu from "../genercis/genericMenu";
import TemplateKittens from "../genercis/templateKittens";
import { getDB } from '@/lib/mongodb'; // Подключаем нашу функцию из прошлого шага

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

// Теперь компонент асинхронный!
export default async function Page() {
  // Получаем данные из БД
  const db = await getDB();
  const kittensData = await db
    .collection('kittens')
    .find({})
    .sort({ id: 1 }) // сортируем по id
    .toArray();

  return <>
    <GenericMenu menuData={menuData} />
    {/* <Loader /> */}
    <TemplateKittens data={kittensData} url="kittens" />
  </>;
}