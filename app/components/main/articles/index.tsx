import ArticlesBlock from "./articlesBlock";
import ArticlesTitle from "./articlesTitle";
import "../../../styles/articlesStyle/articlesStyle.scss";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Articles = () => {
  return (
    <section id="articles">
      <div className="articles">
        <ArticlesTitle />
        <ArticlesBlock />
      </div>
    </section>
  )
};

export default Articles;