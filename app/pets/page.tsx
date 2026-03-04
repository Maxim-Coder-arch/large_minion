import Loader from "../def_components/loader/loader";
import "../styles/pages/pageStyle.scss";
import PetsHeroSection from "./heroSection";
import PetsBlock from "./petsBlock";
import GenericMenu from "../genercis/genericMenu";


export default function PetsPage() {
  return (
    <>
      <GenericMenu />
      <Loader />
      <PetsHeroSection />
      <PetsBlock />
    </>
  );
}