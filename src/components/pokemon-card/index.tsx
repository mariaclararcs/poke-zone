import Image from "next/image"
import { Pokemon } from "@/interfaces/pokemon"

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="pokemon-card">
      <Image 
        src={pokemon.sprites.other['official-artwork'].front_default} 
        alt={pokemon.name}
        width={64}
        height={64}
      />
      <h3>{pokemon.name}</h3>
      <div className="types">
        {pokemon.types.map((type, index) => (
          <span key={index}>{type.type.name}</span>
        ))}
      </div>
    </div>
  )
}