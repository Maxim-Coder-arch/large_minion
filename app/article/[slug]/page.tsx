// app/article/[slug]/page.js
import { getDB } from '@/lib/mongodb';
import { notFound } from 'next/navigation';
import GenericMenu from "@/app/genercis/genericMenu";
import Loader from "@/app/def_components/loader/loader";
import "../../styles/pages/pageArticle.scss";

const menuData = [
  { item: "Главная", section: "/" },
  { item: "Питомцы", section: "../pets" },
  { item: "Контакты", section: "channels" }
];

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  console.log('🔍 Ищем статью со slug:', slug);
  const db = await getDB();
  const data = await db
    .collection('articles')
    .findOne({ slug: slug });
  if (!data) {
    notFound();
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
  );
}