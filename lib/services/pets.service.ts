// lib/services/pets.service.js
import db from '@/lib/db';

class PetsService {
  // Получить всех питомцев из всех коллекций
  async getAllPets() {
    try {
      // Получаем данные параллельно для скорости
      const [adults, graduates, kittens] = await Promise.all([
        db.getAll('adults'),
        db.getAll('graduates'),
        db.getAll('kittens')
      ]);

      // Объединяем все данные в один массив
      const allPets = [...adults, ...graduates, ...kittens];
      
      // Сортируем по id (как в оригинальном petsData)
      allPets.sort((a, b) => a.id - b.id);

      // Преобразуем ObjectId в строки
      return JSON.parse(JSON.stringify(allPets));
    } catch (error) {
      console.error('Ошибка при получении всех питомцев:', error);
      return [];
    }
  }

  // Получить питомцев для первого блока (с учетом слайса)
  async getFirstPetsSection(limit = 3) {
    const allPets = await this.getAllPets();
    return allPets.slice(0, limit);
  }

  // Получить питомцев для мобильной версии
  async getMobilePets() {
    const allPets = await this.getAllPets();
    return allPets.slice(0, 2);
  }

  // Получить питомцев для маленького экрана
  async getSmallScreenPets() {
    return await this.getFirstPetsSection(2); // те же 2, но можно настроить
  }

  // Получить статистику по питомцам
  async getPetsStats() {
    const [adults, graduates, kittens] = await Promise.all([
      db.count('adults'),
      db.count('graduates'),
      db.count('kittens')
    ]);

    return {
      total: adults + graduates + kittens,
      adults,
      graduates,
      kittens
    };
  }
}

const petsService = new PetsService();
export default petsService;