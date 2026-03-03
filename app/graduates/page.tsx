// app/graduates/page.js
import db from '@/lib/db';
import TemplatePets from "../genercis/templatePets";
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  const graduatesData = await db.getAll('graduates', {
    sort: { id: 1 }
  });
  const plainData = JSON.parse(JSON.stringify(graduatesData));
  return <TemplatePets data={plainData} url="graduates" />;
}