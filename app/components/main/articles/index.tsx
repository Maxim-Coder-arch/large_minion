import ArticlesBlock from "./articlesBlock";
import ArticlesTitle from "./articlesTitle";
// import './articles.scss';
import "../../../styles/articlesStyle/articlesStyle.scss";

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