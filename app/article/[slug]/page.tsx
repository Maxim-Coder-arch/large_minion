import db from '@/lib/db';
import { notFound } from 'next/navigation';
import GenericMenu from "@/app/genercis/genericMenu";
import Loader from "@/app/def_components/loader/loader";
import "../../styles/articlesStyle/articlesStyle.scss";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  // 🔍 Преобразуем slug (строку) в число - это и есть index
  const index = parseInt(slug);
  
  // Проверяем, что получилось число
  if (isNaN(index)) {
    console.log('❌ Неверный формат индекса:', slug);
    notFound();
  }
  
  console.log('🔍 Ищем статью с index:', index);
  
  // Ищем по полю index (не по slug!)
  const data = await db.findOne('articles', { index });
  
  console.log('✅ Результат:', data ? 'найдена' : 'не найдена');
  
  if (!data) {
    notFound();
  }
  
  return (
    <>
      <Loader />
      <GenericMenu />
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