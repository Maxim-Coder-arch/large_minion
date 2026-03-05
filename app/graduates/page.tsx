import db from '@/lib/db';
import TemplatePets from "../genercis/templatePets";
import GenericMenu from '../genercis/genericMenu';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  const graduatesData = await db.getAll('graduates', {
    sort: { id: 1 }
  });
  const plainData = JSON.parse(JSON.stringify(graduatesData));
  return <>
    <GenericMenu />
    <TemplatePets data={plainData} url="graduates" />
  </>
  
}