import Image from "next/image"
import Link from "next/link"
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

// Formatação dos nomes
const formatPokemonName = (name: string) => {
  // Casos especiais primeiro
  if (name === 'nidoran-f') return 'Nidoran♀'
  if (name === 'nidoran-m') return 'Nidoran♂'
  if (name === 'farfetchd') return "Farfetch'd"
  if (name === 'mr-mime') return 'Mr. Mime'
  if (name === 'mime-jr') return 'Mime Jr.'
  if (name === 'ho-oh') return 'Ho-Oh'
  if (name === 'dudunsparce-two-segment') return 'Dudunsparce'
  if (name === 'chi-yu') return 'Chi-Yu'
  if (name === 'ting-lu') return 'Ting-Lu'
  if (name === 'chien-pao') return 'Chien-Pao'
  if (name === 'wo-chien') return 'Wo-Chien'
  if (name === 'tatsugiri-curly') return 'Tatsugiri'
  if (name === 'maushold-family-of-four') return 'Maushold'
  if (name === 'squawkabilly-green-plumage') return 'Squawkabilly'
  if (name === 'basculegion-male') return 'Basculegion'
  if (name === 'enamorus-incarnate') return 'Enamorus'
  if (name === 'oinkologne-male') return 'Oinkologne'
  if (name === 'urshifu-single-strike') return 'Urshifu'
  if (name === 'indeedee-male') return 'Indeedee'
  if (name === 'morpeko-full-belly') return 'Morpeko'
  if (name === 'mr-rime') return 'Mr. Rime'
  if (name === 'toxtricity-amped') return 'Toxtricity'
  if (name === 'jangmo-o') return 'Jangmo-O'
  if (name === 'hakamo-o') return 'Hakamo-O'
  if (name === 'kommo-o') return 'Kommo-O'
  if (name === 'type-null') return 'Type: Null'
  if (name === 'minior-red-meteor') return 'Minior'
  if (name === 'mimikyu-disguised') return 'Mimikyu'
  if (name === 'wishiwashi-solo') return 'Wishiwashi'
  if (name === 'oricorio-baile') return 'Oricorio'
  if (name === 'lycanroc-midday') return 'Lycanroc'
  if (name === 'pumpkaboo-average') return 'Pumpkaboo'
  if (name === 'gourgeist-average') return 'Gourgeist'
  if (name === 'zygarde-50') return 'Zygarde'
  if (name === 'aegislash-shield') return 'Aegislash'
  if (name === 'meloetta-aria') return 'Meloetta'
  if (name === 'keldeo-ordinary') return 'Keldeo'
  if (name === 'landorus-incarnate') return 'Landorus'
  if (name === 'thundurus-incarnate') return 'Thundurus'
  if (name === 'tornadus-incarnate') return 'Tornadus'
  if (name === 'darmanitan-standard') return 'Darmanitan'
  if (name === 'basculin-red-striped') return 'Basculin'
  if (name === 'shaymin-land') return 'Shaymin'
  if (name === 'porygon-z') return 'Porygon-Z'
  if (name === 'wormadam-plant') return 'Wormadam'
  if (name === 'giratina-altered') return 'Giratina'
  
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

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