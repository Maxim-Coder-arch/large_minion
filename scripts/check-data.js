
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function checkData() {
  const client = new MongoClient(process.env.MONGODB_URI, {
    tls: true,
    tlsAllowInvalidCertificates: true,
  });

  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    
    console.log('Коллекции в базе данных:');
    const collections = await db.listCollections().toArray();
    
    if (collections.length === 0) {
      console.log('Нет коллекций! Миграция не сработала.');
    } else {
      for (const collection of collections) {
        const count = await db.collection(collection.name).countDocuments();
        console.log(`${collection.name}: ${count} документов`);
      }
    }
    
  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    await client.close();
  }
}

checkData();