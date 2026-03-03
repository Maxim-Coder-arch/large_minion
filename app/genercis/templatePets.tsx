import Link from "next/link";
import Image from "next/image";
import "../styles/pages/pageStyle.scss";

export default function TemplatePets({data, url}) {
  return (
    // @ts-ignore
    <div className="pets-block">
      <div className="pets-cards">
        <div className="separator"></div>
        <div className="pets-line">
          {
            data.map((pet, index) => (
              <Link key={index} href={`/${url}/${pet.id}`} className="pet-card">
                <div className="pet-image-container">
                  <Image 
                    src={pet.portait || pet.image}
                    alt={pet.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="pet-content-container">
                  <h5>{pet.name}</h5>
                  <span>
                    {pet.description.length > 110 
                      ? `${pet.description.substring(0, 110)}...` 
                      : pet.description
                    }
                  </span>
                  <div className="target-action-button" id="target-action-card"></div>
                </div>
              </Link>
            ))
          }
          {/* <TemplatePets data={petsData} /> */}
        </div>
      </div>
    </div>
  );
}