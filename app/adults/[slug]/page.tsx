// app/adults/[slug]/page.js
import db from '@/lib/db';
import TemplateBlank from "@/app/genercis/templateBlank";
import { notFound } from "next/navigation";
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page({ params }) {
  const { slug } = await params;
  const adult = await db.findById('adults', slug);
  if (!adult) {
    notFound();
  }
  const allAdults = await db.getAll('adults');
  const plainAllAdults = JSON.parse(JSON.stringify(allAdults));

  return (
    <div>
      <TemplateBlank 
        petsData={plainAllAdults}
      />
    </div>
  );
}