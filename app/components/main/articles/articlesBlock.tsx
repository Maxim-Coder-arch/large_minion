import Link from "next/link";
import db from '@/lib/db';
import { IArticle } from "@/types/article.type";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ArticlesBlock() {
  const articles = await db.getAll('articles', {
    sort: { index: 1 }
  });
  
  const plainArticles: IArticle[] = JSON.parse(JSON.stringify(articles));

  return (
    <div className="articles-block">
      <div className="list-articles">
        {plainArticles.map((item: IArticle) => (
          <Link key={item.slug} href={`/article/${item.slug}`}>
            <div className="article-item">
              <h4>{item.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}