import { graduatesData } from "../data/graduates/graduates.data";
import TemplatePets from "../genercis/templatePets";

export default function Page() {
  return <TemplatePets data={graduatesData} url="graduates" />;
}