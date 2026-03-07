import Loader from "../def_components/loader/loader";
import "../styles/pages/pageStyle.scss";
import PetsHeroSection from "./heroSection";
import PetsBlock from "./petsBlock";
import GenericMenu from "../genercis/genericMenu";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Все питомцы | Large Minion",
  description: "Питомник мейн-кунов Large Minion (Большой баловень) зарегистрирован в WCF, состоит в КЛК Kominet. Наши питомцы - победители выставок с крепким здоровьем и идеальными экстерьерными данными. Все животные регулярно прививаются и получают достойный уход.",
  keywords: [
    'мейн кун',
    'питомник мейн кунов',
    'котята мейн кун',
    'large minion',
    'большой баловень',
    'main coon',
    'мейн кун купить',
    'котенок мейн куна',
    'питомник кошек',
    'wcf',
    'котята с документами',
    'мейн кун питомник сыктывкар'
  ],
  authors: [{ name: 'Ludmila Balibasova'}],
  creator: 'Large Minion',
  publisher: 'Large Minion',
  openGraph: {
    title: 'Large Minion | монопородный питомник мейн кунов',
    description: 'Питомник мейн-кунов Large Minion (Большой баловень) зарегистрирован в WCF, состоит в КЛК Kominet. Наши питомцы - победители выставок с крепким здоровьем и идеальными экстерьерными данными. Все животные регулярно прививаются и получают достойный уход.',
    type: 'website',
    images: ['/metaSettings/openGraph.jpg'],     
  },
  icons: {
    icon: '/metaSettings/logo.jpg',
    apple: '/metaSettings/logo.jpg',
  }
};

export default function PetsPage() {
  return (
    <>
      <GenericMenu />
      <Loader />
      <PetsHeroSection />
      <PetsBlock />
    </>
  );
}