import Image from "next/image"
import { Pokemon } from "pokenode-ts"

// Mapeamento dos tipos
const typeColorMap: Record<string, string> = {
  bug: "bg-bug",
  dark: "bg-dark",
  dragon: "bg-dragon",
  electric: "bg-electric",
  fairy: "bg-fairy",
  fighting: "bg-fighting",
  fire: "bg-fire",
  flying: "bg-flying",
  ghost: "bg-ghost",
  grass: "bg-grass",
  ground: "bg-ground",
  ice: "bg-ice",
  normal: "bg-normal",
  poison: "bg-poison",
  psychic: "bg-psychic",
  rock: "bg-rock",
  steel: "bg-steel",
  water: "bg-water"
}

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default || 
    pokemon.sprites.front_default ||
    '/pokezone-icon.svg' // fallback

  return (
    <div className="flex flex-col justify-center items-center w-fit gap-2 border-1 border-gray-400 rounded-md p-2">
      {imageUrl ? (
        <Image 
          src={imageUrl} 
          alt={pokemon.name}
          className="bg-gray-200 rounded-md p-1"
          width={200}
          height={200}
          onError={(e) => {
            e.currentTarget.src = '/pokezone-icon.svg'
          }}
        />
      ) : (
        <div className="image-placeholder">No image available</div>
      )}
      
      <div className="flex flex-col justify-center items-center gap-1">
        <h2 className="text-gray-600">#{pokemon.id.toString().padStart(4, '0')}</h2>
        <h3 className="font-semibold capitalize">{pokemon.name}</h3>
        <div className="flex flex-row gap-1 m-1">
          {pokemon.types.map((type, index) => (
            <span 
              key={index}
              className={`${typeColorMap[type.type.name] || 'bg-normal'} flex justify-center items-center w-22 text-background px-2 py-1 rounded-sm text-xs font-medium capitalize`}
              >
                {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}