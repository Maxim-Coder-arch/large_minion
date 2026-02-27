import Link from "next/link";
import { articlesData } from "@/app/evidence/articles.data";
export default function ArticlesBLock() {

  return (
    <div className="articles-block">
      <div className="list-articles">
        {articlesData.map((item, index) => (
          <Link key={index} href={`/article/${item.slug}`}>
            <div className="article-item">
              <h4>{item.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
