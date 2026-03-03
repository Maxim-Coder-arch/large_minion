import { graduatesData } from "@/app/data/graduates/graduates.data";
import TemplateBlank from "@/app/genercis/templateBlank";

export default function Page() {
  return (
    <div>
      <TemplateBlank petsData={graduatesData} />
    </div>
  );
}