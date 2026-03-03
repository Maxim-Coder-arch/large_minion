'use client';
import { kittensData } from "@/app/data/kittens/kittens.data";
import Image from "next/image";
import { useParams } from "next/navigation";
import "../../styles/pages/pageStyle.scss";
import Loader from "@/app/def_components/loader/loader";
import GenericMenu from "@/app/genercis/genericMenu";
import { IMenu } from "@/types/type.data.menu";

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
  const params = useParams();
  const data = kittensData.find((item) => item.id === Number(params.slug));
  if (!data) return <div>Not found</div>;

  return (
    <>
    <GenericMenu menuData={menuData} />
    {/* <Loader /> */}
      <div className="kitten-generic">
        <div className="parent-generic generic">
          <div className="pet-image-page"> {/* mother */}
            <Image 
              src={data.mother.image}
              alt={data.mother.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="mother-content">
            <h3>Мама: {data.mother.name}</h3>
          </div>
        </div>
        <div className="kitten generic">
          <div className="kitten-meta">
            <span>Возраст: {data.age}</span>
            <span>Пол: {data.gender}</span>
            <span>Помет: {data.litter}</span>
          </div>
          <div className="pet-image-page generic"> {/* kitten */}
            <Image 
              src={data.image}
              alt={data.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="kitten-content">
            <h3>{data.name}</h3>
            <span>{data.description}</span>
          </div>
        </div>
        <div className="parent-generic generic">
          <div className="pet-image-page generic"> {/* father */}
            <Image 
              src={data.father.image}
              alt={data.father.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="father-content">
            <h3>Папа: {data.father.name}</h3>
          </div>
        </div>
      </div>
    </>
  );
}