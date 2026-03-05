import GenericMenu from "../genercis/genericMenu";
import TemplateKittens from "../genercis/templateKittens";
import db from "@/lib/db";
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {

  const kittens = await db.getAll('kittens');

  return <>
    <GenericMenu />
    <TemplateKittens data={kittens} url="kittens" />
  </>;
}