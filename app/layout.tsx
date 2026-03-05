import type { Metadata } from "next";
import "./styles/globals.scss";
import Basement from "./components/basement";


export const metadata: Metadata = {
  title: "Large Minion | монопородный питомник мейн кунов",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Cursor /> */}
        {children}
        <Basement />
      </body>
    </html>
  );
}
