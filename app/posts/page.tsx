import db from '@/lib/db';
import Image from "next/image";
import Link from "next/link";
import GenericMenu from '../genercis/genericMenu';
import "../styles/postsStyles/postsStyles.scss";
import { IPost } from '../data/posts/posts.data';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Посты | Large Minion",
  description: "Питомник мейн-кунов Large Minion (Большой баловень) зарегистрирован в WCF, состоит в КЛК Kominet. Наши питомцы - победители выставок с крепким здоровьем и идеальными экстерьерными данными. Все животные регулярно прививаются и получают достойный уход.",
  keywords: [
    'мейн кун',
    'питомник мейн кунов',
    'котята мейн кун',
    'large minion',
    'большой баловень',
    'main coon',
    'мейн кун купить',
    'котенок мейн куна',
    'питомник кошек',
    'wcf',
    'котята с документами',
    'мейн кун питомник сыктывкар'
  ],
  authors: [{ name: 'Ludmila Balibasova'}],
  creator: 'Large Minion',
  publisher: 'Large Minion',
  openGraph: {
    title: 'Large Minion | монопородный питомник мейн кунов',
    description: 'Питомник мейн-кунов Large Minion (Большой баловень) зарегистрирован в WCF, состоит в КЛК Kominet. Наши питомцы - победители выставок с крепким здоровьем и идеальными экстерьерными данными. Все животные регулярно прививаются и получают достойный уход.',
    type: 'website',
    images: ['/metaSettings/openGraph.jpg'],     
  },
  icons: {
    icon: '/metaSettings/logo.jpg',
    apple: '/metaSettings/logo.jpg',
  }
};

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
          {plainPosts.map((post: IPost) => (
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