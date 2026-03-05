import db from '@/lib/db';

class PetsService {
  async getAllPets() {
    try {
      const [adults, graduates, kittens] = await Promise.all([
        db.getAll('adults'),
        db.getAll('graduates'),
        db.getAll('kittens')
      ]);

      const allPets = [...adults, ...graduates, ...kittens];
      
      allPets.sort((a, b) => a.id - b.id);

      return JSON.parse(JSON.stringify(allPets));
    } catch (error) {
      console.error('Ошибка при получении всех питомцев:', error);
      return [];
    }
  }
  async getFirstPetsSection(limit = 3) {
    const allPets = await this.getAllPets();
    return allPets.slice(0, limit);
  }

  async getMobilePets() {
    const allPets = await this.getAllPets();
    return allPets.slice(0, 2);
  }

  async getSmallScreenPets() {
    return await this.getFirstPetsSection(2);
  }
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