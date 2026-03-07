import { getDB } from '../db/mongodb';

// Функция для отслеживания посещения
export async function trackVisit(page: string) {
  const db = await getDB();
  const collection = db.collection('visits');
  
  await collection.insertOne({
    page,
    timestamp: new Date(),
  });
}

// Функция для получения статистики
export async function getVisitsStats() {
  const db = await getDB();
  const collection = db.collection('visits');
  
  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  startOfWeek.setHours(0, 0, 0, 0);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  // Получаем статистику за разные периоды
  const [dayVisits, weekVisits, monthVisits] = await Promise.all([
    collection.countDocuments({ timestamp: { $gte: startOfDay } }),
    collection.countDocuments({ timestamp: { $gte: startOfWeek } }),
    collection.countDocuments({ timestamp: { $gte: startOfMonth } })
  ]);
  
  // Топ популярных страниц
  const popularPages = await collection.aggregate([
    { 
      $group: { 
        _id: '$page', 
        count: { $sum: 1 } 
      } 
    },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]).toArray();
  
  return {
    today: dayVisits,
    week: weekVisits,
    month: monthVisits,
    popularPages
  };
}