import { petsData } from "../components/main/pets/petsData/pets.data";
import TemplatePets from "../genercis/templatePets";

export default function PetsBlock() {
  return <TemplatePets data={petsData} url="pet" />;
}