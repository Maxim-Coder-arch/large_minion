// app/pets/page.js
import db from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import "../styles/pages/pageStyle.scss"; // импортируем стили

export default async function PetsBlock() {
  const [adults, graduates, kittens] = await Promise.all([
    db.getAll('adults', { sort: { id: 1 } }),
    db.getAll('graduates', { sort: { id: 1 } }),
    db.getAll('kittens', { sort: { id: 1 } })
  ]);

  const allPets = [
    ...adults.map(p => ({ ...p, type: 'adults' })),
    ...graduates.map(p => ({ ...p, type: 'graduates' })),
    ...kittens.map(p => ({ ...p, type: 'kittens' }))
  ];
  
  allPets.sort((a, b) => a.id - b.id);
  const plainPets = JSON.parse(JSON.stringify(allPets));

  return (
    <div className="pets-block">
      <div className="pets-cards">
        <div className="separator"></div>
        <div className="pets-line">
          {plainPets.map((pet, index) => (
            <Link 
              key={`${pet.type}-${pet.id}`} 
              href={`/${pet.type}/${pet.id}`} 
              className="pet-card"
            >
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
          ))}
        </div>
      </div>
    </div>
  );
}

// Опционально: отключаем кэширование
export const dynamic = 'force-dynamic';