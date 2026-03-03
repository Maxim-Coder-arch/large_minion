// app/graduates/page.js
import { getDB } from '@/lib/mongodb';
import TemplateBlank from "@/app/genercis/templateBlank";

export default async function Page() {
  // Подключаемся к БД
  const db = await getDB();
  
  // Получаем всех выпускников из БД
  const graduatesData = await db
    .collection('graduates')
    .find({})
    .sort({ id: 1 }) // сортируем по id
    .toArray();

  return (
    <div>
      <TemplateBlank petsData={graduatesData} />
    </div>
  );
}