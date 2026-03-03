// app/graduates/[slug]/page.js
import db from '@/lib/db';
import TemplateBlank from "@/app/genercis/templateBlank";
import { notFound } from 'next/navigation';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const graduate = await db.findById('graduates', slug);
  if (!graduate) {
    notFound();
  }
  const allGraduates = await db.getAll('graduates');
  const plainAllGraduates = JSON.parse(JSON.stringify(allGraduates));

  return (
    <div>
      <TemplateBlank 
        petsData={plainAllGraduates} 
      />
    </div>
  );
}