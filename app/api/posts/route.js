import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : null;

    // Получаем все посты из БД
    let query = db.find('posts', {
      sort: { id: -1 }
    });
    if (limit) {
      query = db.find('posts', {
        sort: { id: -1 },
        limit: limit
      });
    }

    const posts = await query;
    
    // Преобразуем ObjectId в строки
    const plainPosts = JSON.parse(JSON.stringify(posts));

    return NextResponse.json(plainPosts);
  } catch (error) {
    console.error('Ошибка при получении постов:', error);
    return NextResponse.json(
      { error: 'Ошибка при загрузке постов' },
      { status: 500 }
    );
  }
}

// Отключаем кэширование
export const dynamic = 'force-dynamic';