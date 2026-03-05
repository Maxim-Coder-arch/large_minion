import db from '@/lib/db';
import Image from "next/image";
import { notFound } from "next/navigation";
import "../../styles/kittenStyle/kittenStyle.scss";
import GenericMenu from "@/app/genercis/genericMenu";
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const data = await db.findById('kittens', slug);
  if (!data) {
    notFound();
  }

  return (
    <>
      <GenericMenu />
      <section className='lm_kitten_page_wrapper'>
        <div className="lm_kitten_grid_container">
          
          {/* Мама */}
          <div className="lm_kitten_parent_card">
            <div className="lm_kitten_image_wrapper">
              <Image 
                src={data.mother.image}
                alt={data.mother.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="lm_kitten_parent_content">
              <h3 className="lm_kitten_parent_name">Мама: {data.mother.name}</h3>
            </div>
          </div>
          
          {/* Котенок */}
          <div className="lm_kitten_center_card">
            <div className="lm_kitten_meta_info">
              <span>Возраст: {data.age}</span>
              <span>Пол: {data.gender}</span>
              <span>Помет: {data.litter}</span>
            </div>
            <div className="lm_kitten_center_image">
              <Image 
                src={data.image}
                alt={data.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h3 className="lm_kitten_name_title">{data.name}</h3>
              <span className="lm_kitten_description_text">{data.description}</span>
            </div>
          </div>
          
          {/* Папа */}
          <div className="lm_kitten_parent_card">
            <div className="lm_kitten_image_wrapper">
              <Image 
                src={data.father.image}
                alt={data.father.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="lm_kitten_parent_content">
              <h3 className="lm_kitten_parent_name">Папа: {data.father.name}</h3>
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
}