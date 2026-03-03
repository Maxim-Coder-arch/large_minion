// app/kittens/[slug]/page.js
import db from '@/lib/db';
import Image from "next/image";
import { notFound } from "next/navigation";
import "../../styles/pages/pageStyle.scss";
import GenericMenu from "@/app/genercis/genericMenu";
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const menuData = [
  {
    item: "Главная",
    section: "/",
  },
  {
    item: "Контакты",
    section: "channels",
  }
];

export default async function Page({ params }) {
  const { slug } = await params;
  const data = await db.findById('kittens', slug);
  if (!data) {
    notFound();
  }

  return (
    <>
      <GenericMenu menuData={menuData} />
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