// app/posts/page.js
import db from '@/lib/db';
import Image from "next/image";
import Link from "next/link";
import "../styles/pages/pageStyle.scss";
import GenericMenu from '../genercis/genericMenu';

export default async function Page() {
  const posts = await db.getAll('posts', {
    sort: { id: -1 }
  });
  const plainPosts = JSON.parse(JSON.stringify(posts));

  return (
    <>
      <GenericMenu />
      <div className="posts-block">
        {plainPosts.map((post) => (
          <div className="post" key={post.id}>
            <div className="post-image">
              <Image 
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="post-content">
              <div className="post-description">
                <h3>{post.title}</h3>
                <span>{post.description}</span>
              </div>
              <div className="post-link">
                <Link href={post.urlToVk} target="_blank" rel="noopener noreferrer">
                  Смотреть в ВК
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}