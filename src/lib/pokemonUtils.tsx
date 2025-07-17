import React from "react"
import { Pokemon as PokeApiPokemon } from "pokenode-ts"

export type PokemonType = keyof typeof typeColorMap

// Mapeamento dos tipos
export const typeColorMap: Record<string, string> = {
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

export const typeBackgroundColor: Record<string, string> = {
  bug: "bg-bug/30",
  dark: "bg-dark/30",
  dragon: "bg-dragon/30",
  electric: "bg-electric/30",
  fairy: "bg-fairy/30",
  fighting: "bg-fighting/30",
  fire: "bg-fire/30",
  flying: "bg-flying/30",
  ghost: "bg-ghost/30",
  grass: "bg-grass/30",
  ground: "bg-ground/30",
  ice: "bg-ice/30",
  normal: "bg-normal/30",
  poison: "bg-poison/30",
  psychic: "bg-psychic/30",
  rock: "bg-rock/30",
  steel: "bg-steel/30",
  water: "bg-water/30"
}

export const getFirstTypeColor = (pokemon: PokeApiPokemon): string => {
  const firstType = pokemon.types[0]?.type?.name as PokemonType | undefined
  return typeBackgroundColor[firstType || 'normal']
}

// Mapeamento de nomes especiais
export const PokemonNameMap: Record<string, string> = {
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

// Função para formatar nomes
export const formatPokemonName = (name: string): string => {
  const specialCase = PokemonNameMap[name]
  if (specialCase) return specialCase

  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Componente para mostrar o tipo
export const PokemonTypeBadge = ({ 
  type, 
  className = "" 
}: { 
  type: string
  className?: string
}) => (
  <span 
    className={`${typeColorMap[type] || 'bg-normal'} flex justify-center items-center text-background px-2 py-1 font-medium capitalize ${className}`}
  >
    {type}
  </span>
)