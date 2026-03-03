// app/graduates/page.js
import TemplatePets from "../genercis/templatePets";
import { getDB } from '@/lib/mongodb';

export default async function Page() {
  const db = await getDB();
  const graduatesData = await db
    .collection('graduates')
    .find({})
    .sort({ id: 1 })
    .toArray();

  return <TemplatePets data={graduatesData} url="graduates" />;
}