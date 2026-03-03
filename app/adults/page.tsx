// app/adults/page.js
import db from '@/lib/db';
import TemplatePets from "../genercis/templatePets";
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  const adultsData = await db.getAll('adults', {
    sort: { id: 1 }
  });
  const plainData = JSON.parse(JSON.stringify(adultsData));
  return <TemplatePets data={plainData} url="adults" />;
}