// scripts/migrate-simple-js.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrate() {
  console.log('🚀 Начинаем миграцию из JS файлов...');
  
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'LargeMinion';
  
  const client = new MongoClient(uri, {
    tls: true,
    tlsAllowInvalidCertificates: true,
  });

  try {
    await client.connect();
    console.log('✅ Подключились к MongoDB');
    
    const db = client.db(dbName);
    
    // Импортируем данные из JS файлов
    const adults = await import('./data-export/adults.js');
    const graduates = await import('./data-export/graduates.js');
    const kittens = await import('./data-export/kittens.js');
    const posts = await import('./data-export/posts.js');
    const articles = await import('./data-export/articles.js');
    
    const collections = [
      { name: 'adults', data: adults.adultsData, desc: 'Взрослые' },
      { name: 'graduates', data: graduates.graduatesData, desc: 'Выпускники' },
      { name: 'kittens', data: kittens.kittensData, desc: 'Котята' },
      { name: 'posts', data: posts.postsData, desc: 'Посты' },
      { name: 'articles', data: articles.articlesData, desc: 'Статьи' }
    ];
    
    for (const col of collections) {
      console.log(`\n📁 Обрабатываем ${col.desc}...`);
      
      if (!col.data || col.data.length === 0) {
        console.log(`  ⚠️ Нет данных`);
        continue;
      }
      
      console.log(`  Найдено ${col.data.length} записей`);
      
      const collection = db.collection(col.name);
      
      // Очищаем коллекцию
      await collection.deleteMany({});
      console.log(`  Очистили коллекцию ${col.name}`);
      
      // Вставляем данные
      const result = await collection.insertMany(col.data);
      console.log(`  ✅ Добавлено ${result.insertedCount} записей`);
      
      // Создаем индексы
      await collection.createIndex({ id: 1 }, { unique: true });
      console.log(`  ✅ Создан индекс по id`);
      
      if (col.name === 'articles') {
        await collection.createIndex({ slug: 1 }, { unique: true });
        console.log(`  ✅ Создан индекс по slug`);
      }
    }
    
    // Проверяем результат
    console.log('\n📊 ИТОГ:');
    const collectionsList = await db.listCollections().toArray();
    
    for (const { name } of collectionsList) {
      if (name !== 'test') {
        const count = await db.collection(name).countDocuments();
        console.log(`  📁 ${name}: ${count} документов`);
      }
    }
    
    console.log('\n✨ Миграция завершена!');
    
  } catch (error) {
    console.error('❌ Ошибка:', error);
  } finally {
    await client.close();
    console.log('🔌 Соединение закрыто');
  }
}

migrate();