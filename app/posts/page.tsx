import db from '@/lib/db';
import Image from "next/image";
import Link from "next/link";
import GenericMenu from '../genercis/genericMenu';
import "../styles/postsStyles/postsStyles.scss";

export default async function Page() {
  const posts = await db.getAll('posts', {
    sort: { id: -1 }
  });
  const plainPosts = JSON.parse(JSON.stringify(posts));

  return (
    <>
      <GenericMenu />
      <section className='lm-posts-section'>
        <div className="lm-posts-grid">
          {plainPosts.map((post) => (
            <article className="lm-post-card" key={post.id}>
              <div className="lm-post-card__image-wrapper">
                <Image 
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="lm-post-card__image"
                />
              </div>
              <div className="lm-post-card__content">
                <div className="lm-post-card__description">
                  <h3 className="lm-post-card__title">{post.title}</h3>
                  <span className="lm-post-card__excerpt">{post.description}</span>
                </div>
                <div className="lm-post-card__action">
                  <Link 
                    href={post.urlToVk} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="lm-post-card__link"
                  >
                    Смотреть в ВК
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}