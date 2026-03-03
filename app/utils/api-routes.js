// app/utils/api-routes.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  // Убираем устаревшие параметры
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

// Для разработки используем глобальную переменную
if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect()
      .then(client => {
        console.log('✅ MongoDB подключена в dev режиме');
        return client;
      })
      .catch(err => {
        console.error('❌ Ошибка подключения MongoDB в dev:', err);
        throw err;
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Для production
  client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .then(client => {
      console.log('✅ MongoDB подключена в production режиме');
      return client;
    })
    .catch(err => {
      console.error('❌ Ошибка подключения MongoDB в production:', err);
      throw err;
    });
}

export async function getDB() {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB);
}

// Для проверки подключения
export async function testConnection() {
  try {
    const db = await getDB();
    await db.command({ ping: 1 });
    console.log('✅ Пинг MongoDB успешен');
    return true;
  } catch (error) {
    console.error('❌ Пинг MongoDB failed:', error);
    return false;
  }
}