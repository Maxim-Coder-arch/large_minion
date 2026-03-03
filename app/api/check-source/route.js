import { NextResponse } from 'next/server';
import { getDB } from '@/lib/mongodb';

export async function GET() {
  // Проверяем переменные окружения
  const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    USE_DB: process.env.USE_DB,
    MONGODB_DB: process.env.MONGODB_DB,
    MONGODB_URI_set: !!process.env.MONGODB_URI,
    MONGODB_URI_preview: process.env.MONGODB_URI ? 
      process.env.MONGODB_URI.substring(0, 30) + '...' : 'not set'
  };
  
  // Проверяем подключение к БД
  let dbStatus = 'not tried';
  let collections = [];
  let articlesCount = 0;
  
  try {
    const db = await getDB();
    dbStatus = 'connected';
    
    // Получаем список коллекций
    const collectionsList = await db.listCollections().toArray();
    collections = collectionsList.map(c => c.name);
    
    // Считаем статьи
    articlesCount = await db.collection('articles').countDocuments();
    
  } catch (error) {
    dbStatus = `error: ${error.message}`;
  }
  
  // Проверяем локальные данные
  let localArticlesCount = 0;
  try {
    const { articlesData } = await import('@/app/evidence/articles.data');
    localArticlesCount = articlesData.length;
  } catch (error) {
    console.error('Error loading local data:', error);
  }
  
  return NextResponse.json({
    environment: envVars,
    database: {
      status: dbStatus,
      collections,
      articlesCount
    },
    localData: {
      articlesCount: localArticlesCount
    },
    verdict: envVars.USE_DB === 'true' && dbStatus === 'connected' 
      ? '✅ ДОЛЖНЫ ИСПОЛЬЗОВАТЬСЯ ДАННЫЕ ИЗ БД' 
      : '⚠️ ИСПОЛЬЗУЮТСЯ ЛОКАЛЬНЫЕ ДАННЫЕ'
  });
}