// lib/db/collections.js
// Здесь описываем все коллекции и их особенности
export const collections = {
  kittens: {
    name: 'kittens',
    searchField: 'id',           // поле для поиска по умолчанию
    searchType: 'number',         // тип поля (number, string, objectId)
    defaultSort: { id: 1 },       // сортировка по умолчанию
    fields: ['id', 'name', 'image', 'description', 'litter', 'age', 'gender', 'mother', 'father']
  },
  adults: {
    name: 'adults',
    searchField: 'id',
    searchType: 'number',
    defaultSort: { id: 1 },
    fields: ['id', 'name', 'portait', 'description']
  },
  graduates: {
    name: 'graduates',
    searchField: 'id',
    searchType: 'number',
    defaultSort: { id: 1 },
    fields: ['id', 'name', 'portait', 'description']
  },
  articles: {
    name: 'articles',
    searchField: 'slug',          // для статей ищем по slug
    searchType: 'string',
    defaultSort: { index: 1 },
    fields: ['index', 'title', 'description', 'slug']
  },
  posts: {
    name: 'posts',
    searchField: 'id',
    searchType: 'number',
    defaultSort: { id: -1 },       // новые посты первыми
    fields: ['id', 'title', 'description', 'image', 'urlToVk']
  }
};

export const collectionNames = Object.keys(collections);