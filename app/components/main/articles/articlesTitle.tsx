import db from '@/lib/db';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ArticlesTitle() {
  const articlesCount = await db.count('articles');
  
  return (
    <div className="articles-title">
      <div className="info-articles">
        <span>Largeminion Eri</span>
        <div className="brewer-photo" />
        <div className="info-articles-data">
          <div className="articles-count generic-articles">
            <h5>{articlesCount}</h5>
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