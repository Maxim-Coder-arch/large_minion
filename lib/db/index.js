// import { getDB } from './client';
// import { collections } from './collections';

// class Database {
//   constructor() {
//     this.db = null;
//     this.collections = collections;
//     this.cache = new Map();
//     this.debug = process.env.NODE_ENV === 'development';
//   }
//   async init() {
//     if (!this.db) {
//       this.db = await getDB();
//       if (this.debug) console.log('Database connected');
//     }
//     return this.db;
//   }

//   async getCollection(name) {
//     await this.init();
    
//     if (!this.collections[name]) {
//       throw new Error(`Collection "${name}" not found in config`);
//     }
    
//     return this.db.collection(name);
//   }
//   async find(collectionName, options = {}) {
//     const {
//       filter = {},
//       sort = null,
//       limit = 0,
//       skip = 0,
//       useCache = false,
//       cacheTTL = 60000,
//     } = options;

//     const collection = await this.getCollection(collectionName);
//     const config = this.collections[collectionName];
//     const cacheKey = `${collectionName}-${JSON.stringify({ filter, sort, limit, skip })}`;

//     if (useCache && this.cache.has(cacheKey)) {
//       const { data, timestamp } = this.cache.get(cacheKey);
//       if (Date.now() - timestamp < cacheTTL) {
//         if (this.debug) console.log(`🔵 Cache hit: ${collectionName}`);
//         return data;
//       }
//       this.cache.delete(cacheKey);
//     }

//     let query = collection.find(filter);

//     if (sort) {
//       query = query.sort(sort);
//     } else if (config.defaultSort) {
//       query = query.sort(config.defaultSort);
//     }
//     if (skip > 0) query = query.skip(skip);
//     if (limit > 0) query = query.limit(limit);

//     const data = await query.toArray();

//     if (useCache) {
//       this.cache.set(cacheKey, { data, timestamp: Date.now() });
//       if (this.debug) console.log(`Cache set: ${collectionName}`);
//     }

//     if (this.debug) console.log(`Found ${data.length} items in ${collectionName}`);
//     return data;
//   }

//   async findOne(collectionName, filter, options = {}) {
//     const data = await this.find(collectionName, {
//       ...options,
//       filter,
//       limit: 1
//     });
//     return data[0] || null;
//   }
//   async findById(collectionName, id) {
//     const config = this.collections[collectionName];
    
//     if (!config) {
//       throw new Error(`Collection "${collectionName}" not found`);
//     }

//     let filter = {};
    
//     if (config.searchType === 'number') {
//       filter = { [config.searchField]: parseInt(id) };
//     } else if (config.searchType === 'string') {
//       filter = { [config.searchField]: id };
//     } else {
//       filter = { [config.searchField]: id };
//     }

//     return await this.findOne(collectionName, filter);
//   }

//   async getAll(collectionName, options = {}) {
//     return await this.find(collectionName, {
//       ...options,
//       filter: {}
//     });
//   }

//   async getRandom(collectionName, count = 1) {
//     const collection = await this.getCollection(collectionName);
//     const pipeline = [{ $sample: { size: count } }];
    
//     if (this.collections[collectionName].defaultSort) {
//       pipeline.push({ $sort: this.collections[collectionName].defaultSort });
//     }
    
//     const data = await collection.aggregate(pipeline).toArray();
//     return count === 1 ? data[0] : data;
//   }

//   async count(collectionName, filter = {}) {
//     const collection = await this.getCollection(collectionName);
//     return await collection.countDocuments(filter);
//   }
//   async getStats() {
//     await this.init();
//     const stats = {};

//     for (const [key, config] of Object.entries(this.collections)) {
//       const collection = await this.getCollection(key);
//       const count = await collection.countDocuments();
//       const indexes = await collection.indexes();
      
//       stats[key] = {
//         name: config.name,
//         count,
//         indexes: indexes.map(i => i.name),
//         fields: config.fields
//       };
//     }

//     return stats;
//   }

//   clearCache() {
//     this.cache.clear();
//     if (this.debug) console.log('Cache cleared');
//   }
//   async debug() {
//     const stats = await this.getStats();
//     console.log('Database Stats:', stats);
//     console.log('Cache size:', this.cache.size);
//     return stats;
//   }
// }

// // Создаем и экспортируем единственный экземпляр
// const db = new Database();
// export default db;
































import { getDB } from './client';
import { collections } from './collections';

class Database {
  constructor() {
    this.db = null;
    this.collections = collections;
    this.debug = process.env.NODE_ENV === 'development';
  }

  async init() {
    if (!this.db) {
      this.db = await getDB();
      if (this.debug) console.log('Database connected');
    }
    return this.db;
  }

  async getCollection(name) {
    await this.init();
    
    if (!this.collections[name]) {
      throw new Error(`Collection "${name}" not found in config`);
    }
    
    return this.db.collection(name);
  }

  async find(collectionName, options = {}) {
    const {
      filter = {},
      sort = null,
      limit = 0,
      skip = 0,
    } = options;

    const collection = await this.getCollection(collectionName);
    const config = this.collections[collectionName];

    let query = collection.find(filter);

    if (sort) {
      query = query.sort(sort);
    } else if (config.defaultSort) {
      query = query.sort(config.defaultSort);
    }
    if (skip > 0) query = query.skip(skip);
    if (limit > 0) query = query.limit(limit);

    const data = await query.toArray();

    if (this.debug) console.log(`Found ${data.length} items in ${collectionName}`);
    return data;
  }

  async findOne(collectionName, filter, options = {}) {
    const data = await this.find(collectionName, {
      ...options,
      filter,
      limit: 1
    });
    return data[0] || null;
  }

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

  async getAll(collectionName, options = {}) {
    return await this.find(collectionName, {
      ...options,
      filter: {}
    });
  }

  async getRandom(collectionName, count = 1) {
    const collection = await this.getCollection(collectionName);
    const pipeline = [{ $sample: { size: count } }];
    
    if (this.collections[collectionName].defaultSort) {
      pipeline.push({ $sort: this.collections[collectionName].defaultSort });
    }
    
    const data = await collection.aggregate(pipeline).toArray();
    return count === 1 ? data[0] : data;
  }

  async count(collectionName, filter = {}) {
    const collection = await this.getCollection(collectionName);
    return await collection.countDocuments(filter);
  }

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

  async debug() {
    const stats = await this.getStats();
    console.log('Database Stats:', stats);
    return stats;
  }
}

const db = new Database();
export default db;