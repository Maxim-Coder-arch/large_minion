import FirstPetsSection from "./petsComponents/firstPetsSection";
import SecondPetsSection from "./petsComponents/secondPetsSection";

const Pets = () => {
  return (
    <section id="pets">
      <div className="pets-bl">
        <FirstPetsSection />
        <SecondPetsSection />
      </div>
    </section>
  );
};

export default Pets;