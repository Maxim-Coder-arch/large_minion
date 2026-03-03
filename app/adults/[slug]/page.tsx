import { adultsData } from "@/app/data/adults/adults.data";
import TemplateBlank from "@/app/genercis/templateBlank";

export default function Page() {
  return (
    <div>
      <TemplateBlank petsData={adultsData} />
    </div>
  );
}