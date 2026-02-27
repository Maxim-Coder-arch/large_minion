'use client';
import { articlesData } from "@/app/evidence/articles.data";
import { useParams } from "next/navigation";
import "../../styles/pages/pageArticle.scss";
import Loader from "@/app/def_components/loader/loader";
import GenericMenu from "@/app/genercis/genericMenu";
import { IMenu } from "@/types/type.data.menu";

const menuData: IMenu[] = [
  {
    item: "Главная",
    section: "/",
  },
  {
    item: "Питомцы",
    section: "../pets",
  },
  {
    item: "Контакты",
    section: "channels",
  }
];

export default function Articles() {
  const params = useParams();
  const data = articlesData.find((item) => item.slug === params.slug);

  if (!data) {
    return <h1>Not found</h1>;
  }

  return (
    <>
      <Loader />
      <GenericMenu menuData={menuData} />
      <div className="article-data">
        <div className="article-content">
          <h1>{data.title}</h1>
          <div className="article">
            <span>{data.description}</span>
          </div>
        </div>
      </div>
    </>
  )
}