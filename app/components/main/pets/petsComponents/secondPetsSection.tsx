'use client';
import { IPost } from "@/app/data/posts/posts.data";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import ErrorTemplate from "@/app/def_components/errors/templateError";
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const SecondPetsSection = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const targetPoint = useRef(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/posts?limit=4');
        
        if (!response.ok) {
          throw new Error('Ошибка при загрузке постов');
        }
        
        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch  {
        setError('Упс! Произошла ошибка при загрузке постов');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader">Загрузка постов...</div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorTemplate error={error} />
    );
  }

  if (posts.length === 0) {
    return (
      <div className="empty-container">
        <div className="empty-message">Нет постов</div>
      </div>
    );
  }

  return (
    <>
      <div className="pets-posts pets-navigation">
        <h3 className="pets-main-title">посты</h3>
        <Link href="/posts">Смотреть все посты</Link>
      </div>
      <div className="second-pets-section" ref={targetPoint}>
        {posts.map((post, index) => (
          <div 
            
            key={post.id || index} 
            className="second-pets-section-data-card-opt"
          >
            <div className="image-wrapper-opt">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="pet-image"
                priority={index < 2}
              />
            </div>
            <span>{post.title}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default SecondPetsSection;