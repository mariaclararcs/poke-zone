import Image from "next/image"
import Link from "next/link"
import { Pokemon } from "pokenode-ts"
import { formatPokemonName, PokemonTypeBadge } from "@/lib/pokemonUtils"

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default || 
  pokemon.sprites.front_default ||
  '/pokezone-icon.svg' // fallback

  return (
    <div className="flex flex-col justify-center items-center w-fit gap-2 border-1 border-gray-400 rounded-md p-2">
      <Link 
        href={`/pokemons/${pokemon.name}`}
        className="cursor-pointer"
      >
        <div>
          {imageUrl ? (
            <Image 
              src={imageUrl || "/pokezone-icon.svg"} 
              alt={pokemon.name}
              className="bg-gray-200 rounded-md p-1"
              width={200}
              height={200}
            />
          ) : (
            <div className="image-placeholder">No image available</div>
          )}
        </div>
      </Link>
      
      <div className="flex flex-col justify-center items-center gap-1">
        <h2 className="text-gray-600">#{pokemon.id.toString().padStart(4, '0')}</h2>
        <h3 className="font-semibold">{formatPokemonName(pokemon.name)}</h3>
        <div className="flex gap-1 m-1">
          {pokemon.types.map((type, index) => (
            <PokemonTypeBadge key={index} type={type.type.name} className="rounded-full text-xs w-22" />
          ))}
        </div>
      </div>
    </div>
  )
}