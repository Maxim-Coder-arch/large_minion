import Link from "next/link";
import db from '@/lib/db';
import { IArticle } from "@/types/article.type";
import ErrorTemplate from "@/app/def_components/errors/templateError";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ArticlesBlock() {
  const articles = await db.getAll('articles', {
    sort: { index: 1 }
  });
  
  if (!articles) {
    return <ErrorTemplate error="Ошибка при загрузке статей" />;
  }

  const plainArticles: IArticle[] = JSON.parse(JSON.stringify(articles));

  return (
    <div className="articles-block">
      <div className="list-articles">
        {plainArticles.map((item: IArticle) => (
          <Link key={`${item.index}-${Date.now().toString()}`} href={`/article/${item.index}`}>
            <div className="article-item">
              <h4>{item.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}