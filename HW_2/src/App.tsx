import './styles/global.scss'
import PetCard from "./components/PetCard/PetCard.tsx";
import type {PetCardProps} from "./components/PetCard/types.ts";
import {useEffect, useState} from "react";
// import type {PetCardProps} from "./components/PetCard/types.ts";

function App() {
  const [pets, setPets] = useState<PetCardProps[]>([]);

  useEffect(() => {
    async function fetchPets() {
      const response = await fetch("")
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      setPets(data);
    }

    fetchPets()
  }, []);

  return (
    <>

      <div className="pet__wrapper">
        {pets.map((pet) => (
          <PetCard
            id={pet.id}
            name={pet.name}
            species={pet.species}
            mood={pet.mood}
            energy={pet.energy}
            level={pet.level}
            avatar={pet.avatar}
          />
        ))}
      </div>

    </>
  )
}

export default App
