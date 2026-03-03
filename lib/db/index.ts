// lib/db/index.js
import { getDB } from './client';
import { collections } from './collections';

class Database {
  constructor() {
    this.db = null;
    this.collections = collections;
    this.cache = new Map();
    this.debug = process.env.NODE_ENV === 'development';
  }

  // Инициализация подключения
  async init() {
    if (!this.db) {
      this.db = await getDB();
      if (this.debug) console.log('📦 Database connected');
    }
    return this.db;
  }

  // Получить коллекцию
  async getCollection(name) {
    await this.init();
    
    if (!this.collections[name]) {
      throw new Error(`Collection "${name}" not found in config`);
    }
    
    return this.db.collection(name);
  }

  

  // Основной метод для получения данных
  async find(collectionName, options = {}) {
    const {
      filter = {},
      sort = null,
      limit = 0,
      skip = 0,
      useCache = false,
      cacheTTL = 60000, // 60 секунд
    } = options;

    const collection = await this.getCollection(collectionName);
    const config = this.collections[collectionName];

    // Ключ для кэша
    const cacheKey = `${collectionName}-${JSON.stringify({ filter, sort, limit, skip })}`;

    // Проверяем кэш
    if (useCache && this.cache.has(cacheKey)) {
      const { data, timestamp } = this.cache.get(cacheKey);
      if (Date.now() - timestamp < cacheTTL) {
        if (this.debug) console.log(`🔵 Cache hit: ${collectionName}`);
        return data;
      }
      this.cache.delete(cacheKey);
    }

    // Строим запрос
    let query = collection.find(filter);

    // Применяем сортировку
    if (sort) {
      query = query.sort(sort);
    } else if (config.defaultSort) {
      query = query.sort(config.defaultSort);
    }

    // Применяем пагинацию
    if (skip > 0) query = query.skip(skip);
    if (limit > 0) query = query.limit(limit);

    // Выполняем запрос
    const data = await query.toArray();

    // Сохраняем в кэш если нужно
    if (useCache) {
      this.cache.set(cacheKey, { data, timestamp: Date.now() });
      if (this.debug) console.log(`🟢 Cache set: ${collectionName}`);
    }

    if (this.debug) console.log(`📊 Found ${data.length} items in ${collectionName}`);
    return data;
  }

  // Найти один документ
  async findOne(collectionName, filter, options = {}) {
    const data = await this.find(collectionName, {
      ...options,
      filter,
      limit: 1
    });
    return data[0] || null;
  }

  // Найти по ID (универсально)
  async findById(collectionName, id) {
    const config = this.collections[collectionName];
    
    if (!config) {
      throw new Error(`Collection "${collectionName}" not found`);
    }

    let filter = {};
    
    if (config.searchType === 'number') {
      filter = { [config.searchField]: parseInt(id) };
    } else if (config.searchType === 'string') {
      filter = { [config.searchField]: id };
    } else {
      filter = { [config.searchField]: id };
    }

    return await this.findOne(collectionName, filter);
  }

  // Получить все документы из коллекции
  async getAll(collectionName, options = {}) {
    return await this.find(collectionName, {
      ...options,
      filter: {}
    });
  }

  // Получить несколько случайных документов
  async getRandom(collectionName, count = 1) {
    const collection = await this.getCollection(collectionName);
    const pipeline = [{ $sample: { size: count } }];
    
    if (this.collections[collectionName].defaultSort) {
      pipeline.push({ $sort: this.collections[collectionName].defaultSort });
    }
    
    const data = await collection.aggregate(pipeline).toArray();
    return count === 1 ? data[0] : data;
  }

  // Подсчитать количество документов
  async count(collectionName, filter = {}) {
    const collection = await this.getCollection(collectionName);
    return await collection.countDocuments(filter);
  }

  // Получить статистику по базе
  async getStats() {
    await this.init();
    const stats = {};

    for (const [key, config] of Object.entries(this.collections)) {
      const collection = await this.getCollection(key);
      const count = await collection.countDocuments();
      const indexes = await collection.indexes();
      
      stats[key] = {
        name: config.name,
        count,
        indexes: indexes.map(i => i.name),
        fields: config.fields
      };
    }

    return stats;
  }

  // Очистить кэш
  clearCache() {
    this.cache.clear();
    if (this.debug) console.log('🧹 Cache cleared');
  }

  // Для отладки - показать состояние
  async debug() {
    const stats = await this.getStats();
    console.log('📊 Database Stats:', stats);
    console.log('💾 Cache size:', this.cache.size);
    return stats;
  }
}

// Создаем и экспортируем единственный экземпляр
const db = new Database();
export default db;