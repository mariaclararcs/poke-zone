import Image from "next/image"
import { Pokemon } from "pokenode-ts"

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  // Verifica se existe a imagem oficial, caso contrário usa a sprite padrão
  const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default || 
    pokemon.sprites.front_default ||
    '/pokezone-icon.svg' // fallback

  return (
    <div className="flex flex-col justify-center items-center border-1 border-gray-400 rounded-md shadow-sm p-4">
      {imageUrl ? (
        <Image 
          src={imageUrl} 
          alt={pokemon.name}
          width={100}
          height={100}
          onError={(e) => {
            // Fallback em caso de erro no carregamento
            e.currentTarget.src = '/pokezone-icon.svg'
          }}
        />
      ) : (
        <div className="image-placeholder">No image available</div>
      )}
      
      <h3>{pokemon.id}</h3>
      <h3>{pokemon.name}</h3>
      <div className="flex flex-row gap-2">
        {pokemon.types.map((type, index) => (
          <span key={index} className="bg-blue-300 px-2 py-1 rounded-sm">{type.type.name}</span>
        ))}
      </div>
    </div>
  )
}