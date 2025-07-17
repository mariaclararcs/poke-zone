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
const PokemonNameMap: Record<string, string> = {
  'nidoran-f': 'Nidoran♀',
  'nidoran-m': 'Nidoran♂',
  'farfetchd': "Farfetch'd",
  'mr-mime': 'Mr. Mime',
  'mime-jr': 'Mime Jr.',
  'ho-oh': 'Ho-Oh',
  'chi-yu': 'Chi-Yu',
  'ting-lu': 'Ting-Lu',
  'chien-pao': 'Chien-Pao',
  'wo-chien': 'Wo-Chien',
  'mr-rime': 'Mr. Rime',
  'jangmo-o': 'Jangmo-O',
  'hakamo-o': 'Hakamo-O',
  'kommo-o': 'Kommo-O',
  'type-null': 'Type: Null',
  'porygon-z': 'Porygon-Z',
  
  'dudunsparce-two-segment': 'Dudunsparce',
  'tatsugiri-curly': 'Tatsugiri',
  'maushold-family-of-four': 'Maushold',
  'squawkabilly-green-plumage': 'Squawkabilly',
  'basculegion-male': 'Basculegion',
  'enamorus-incarnate': 'Enamorus',
  'oinkologne-male': 'Oinkologne',
  'urshifu-single-strike': 'Urshifu',
  'indeedee-male': 'Indeedee',
  'morpeko-full-belly': 'Morpeko',
  'toxtricity-amped': 'Toxtricity',
  'minior-red-meteor': 'Minior',
  'mimikyu-disguised': 'Mimikyu',
  'wishiwashi-solo': 'Wishiwashi',
  'oricorio-baile': 'Oricorio',
  'lycanroc-midday': 'Lycanroc',
  'pumpkaboo-average': 'Pumpkaboo',
  'gourgeist-average': 'Gourgeist',
  'zygarde-50': 'Zygarde',
  'aegislash-shield': 'Aegislash',
  'meloetta-aria': 'Meloetta',
  'keldeo-ordinary': 'Keldeo',
  'landorus-incarnate': 'Landorus',
  'thundurus-incarnate': 'Thundurus',
  'tornadus-incarnate': 'Tornadus',
  'darmanitan-standard': 'Darmanitan',
  'basculin-red-striped': 'Basculin',
  'shaymin-land': 'Shaymin',
  'wormadam-plant': 'Wormadam',
  'giratina-altered': 'Giratina',
}

const formatPokemonName = (name: string): string => {
  const specialCase = PokemonNameMap[name];
  if (specialCase) return specialCase;

  const baseName = name.split('-')[0];

  return baseName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
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
        <div className="flex gap-1 m-1">
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