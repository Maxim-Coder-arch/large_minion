'use client';
import { useParams } from "next/navigation";
import { petsData } from "@/app/components/main/pets/petsData/pets.data";
import Loader from "@/app/def_components/loader/loader";
import "../../styles/pages/pageStyle.scss";
import GenericMenu from "@/app/genercis/genericMenu";
import TemplateBlank from "@/app/genercis/templateBlank";

export default function PetPage() {
  const params = useParams();
  const data = petsData.find(p => p.id.toString() === params.slug);
  if (!data) {
    return <div>Not found</div>;
  }
  return (
    <>
      <GenericMenu />
      <Loader />
      <TemplateBlank petsData={petsData} />
    </>
  );
}