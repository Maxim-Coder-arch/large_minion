import "../styles/pages/pageStyle.scss";
import { postsData } from "../data/posts/posts.data";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="posts-block">
      {
        postsData.map((post, index) => {
          return (
            <div className="post" key={index}>
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
                  <Link href={post.urlToVk}>Смотреть в ВК</Link>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}