import { articlesData } from "@/app/data/articles/articles.data";

export default function ArticlesTitle() {
  return (
    <div className="articles-title">
      <div className="info-articles">
        <span>Largeminion Eri</span>
        <div className="info-articles-data">
          <div className="articles-count generic-articles">
            <h5>{articlesData.length}</h5>
            <span>Всего статей</span>
          </div>
          <div className="articles-useful generic-articles">
            <h5>Полезные статьи</h5>
            <span>Узнайте новое о котиках!</span>
          </div>
          <div className="image-paw"></div>
        </div>
      </div>
    </div>
  );
}
