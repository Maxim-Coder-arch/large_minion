import ArticlesBLock from "./articlesBlock";
import ArticlesTitle from "./articlesTitle";

const Articles = () => {
  return (
    <section id="articles">
      <div className="articles">
        <ArticlesTitle />
        <ArticlesBLock />
      </div>
    </section>
  )
};

export default Articles;