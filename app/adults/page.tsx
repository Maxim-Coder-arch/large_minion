import { adultsData } from "../data/adults/adults.data";
import TemplatePets from "../genercis/templatePets";
export default function Page() {
  return <TemplatePets data={adultsData} url="adults" />;
}