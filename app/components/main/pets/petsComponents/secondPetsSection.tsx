// components/SecondPetsSection/SecondPetsSection.js
'use client';
import { IPost } from "@/app/data/posts/posts.data";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const SecondPetsSection = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const targetPoint = useRef(null);
  const isViewElementVisible = useInView(targetPoint, { once: true, amount: .2 });

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/posts?limit=4');
        
        if (!response.ok) {
          throw new Error('Ошибка при загрузке постов');
        }
        
        const data = await response.json();
        console.log('📦 Загруженные посты:', data);
        setPosts(data);
        setError(null);
      } catch (err) {
        console.error('Ошибка загрузки постов:', err);
        setError('Не удалось загрузить посты');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Проверяем видимость для отладки
  useEffect(() => {
    console.log('👁️ Видимость секции:', isViewElementVisible);
  }, [isViewElementVisible]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader">Загрузка постов...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
      </div>
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