'use client';
import { useParams } from "next/navigation";
import { petsData } from "@/app/components/main/pets/petsData/pets.data";
import Loader from "@/app/def_components/loader/loader";
import Image from "next/image";
import "../styles/pages/pageStyle.scss";
import Link from "next/link";
import GenericMenu from "@/app/genercis/genericMenu";
import { IMenu } from "@/types/type.data.menu";

const menuData: IMenu[] = [
  {
    item: "Главная",
    section: "/",
  },
  {
    item: "Котики",
    section: "/pets",
  },
  {
    item: "Контакты",
    section: "channels",
  }
];

export default function TemplateBlank() {
  const params = useParams();
  const data = petsData.find(p => p.id.toString() === params.slug);
  if (!data) {
    return <div>Not found</div>;
  }
  return (
    <>
      <GenericMenu menuData={menuData} />
      <Loader />
      <div className="pet-page">
        <div className="title-pet generic">
          <h1>{data.name}</h1>
          <Link href={data.href ?? "#"} target="_blank" className="target-action-pet">
            <div className="target-action-button-pet"></div>
            <span>Перейти к посту</span>
          </Link>
        </div>
        <div className="pet-image-page generic">
          <Image 
            src={data.portait}
            alt={data.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="desc-pet generic">
          <span>{data.description}</span>
          <Link href="/pets">Смотреть еще</Link>
        </div>
      </div>
    </>
  );
}