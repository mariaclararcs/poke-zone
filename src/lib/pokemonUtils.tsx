import React from "react"
import { PokemonSpecies, Pokemon as PokeApiPokemon } from "pokenode-ts"

export type PokemonType = keyof typeof typeColorMap

interface Genus {
  genus: string
  language: {
    name: string
    url: string
  }
}

interface WeaknessInfo {
  type: string
  multiplier: number // 2 ou 4
}

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

export const getFirstTypeColor = (pokemon: PokeApiPokemon): string => {
  const firstType = pokemon.types[0]?.type?.name as PokemonType | undefined
  return typeColorMap[firstType || 'normal']
}

export const typeRingColorMap: Record<string, string> = {
  bug: "ring-bug",
  dark: "ring-dark",
  dragon: "ring-dragon",
  electric: "ring-electric",
  fairy: "ring-fairy",
  fighting: "ring-fighting",
  fire: "ring-fire",
  flying: "ring-flying",
  ghost: "ring-ghost",
  grass: "ring-grass",
  ground: "ring-ground",
  ice: "ring-ice",
  normal: "ring-normal",
  poison: "ring-poison",
  psychic: "ring-psychic",
  rock: "ring-rock",
  steel: "ring-steel",
  water: "ring-water"
}

export const getFirstRingColor = (pokemon: PokeApiPokemon): string => {
  const firstType = pokemon.types[0]?.type?.name as PokemonType | undefined
  return typeRingColorMap[firstType || 'normal']
}

export const typeWeaknesses: Record<string, string[]> = {
  bug: ['fire', 'flying', 'rock'],
  dark: ['fighting', 'bug', 'fairy'],
  dragon: ['ice', 'dragon', 'fairy'],
  electric: ['ground'],
  fairy: ['poison', 'steel'],
  fighting: ['flying', 'psychic', 'fairy'],
  fire: ['water', 'ground', 'rock'],
  flying: ['electric', 'ice', 'rock'],
  ghost: ['ghost', 'dark'],
  grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
  ground: ['water', 'grass', 'ice'],
  ice: ['fire', 'fighting', 'rock', 'steel'],
  normal: ['fighting'],
  poison: ['ground', 'psychic'],
  psychic: ['bug', 'ghost', 'dark'],
  rock: ['water', 'grass', 'fighting', 'ground', 'steel'],
  steel: ['fire', 'fighting', 'ground'],
  water: ['grass', 'electric']
}

export const typeResistances: Record<string, string[]> = {
  bug: ['fighting', 'ground', 'grass'],
  dark: ['ghost', 'dark'],
  dragon: ['fire', 'water', 'grass', 'electric'],
  electric: ['electric', 'flying', 'steel'],
  fairy: ['fighting', 'bug', 'dark'],
  fighting: ['rock', 'bug', 'dark'],
  fire: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'],
  flying: ['grass', 'fighting', 'bug'],
  ghost: ['poison', 'bug'],
  grass: ['water', 'electric', 'grass', 'ground'],
  ground: ['poison', 'rock'],
  ice: ['ice'],
  normal: [],
  poison: ['fighting', 'poison', 'bug', 'grass', 'fairy'],
  psychic: ['fighting', 'psychic'],
  rock: ['normal', 'fire', 'poison', 'flying'],
  steel: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'],
  water: ['fire', 'water', 'ice', 'steel']
}

export const typeImmunities: Record<string, string[]> = {
  normal: ['ghost'],
  ghost: ['normal', 'fighting'],
  ground: ['electric'],
  flying: ['ground'],
  dark: ['psychic'],
  fairy: ['dragon'],
  steel: ['poison'],
  electric: []
}

export const calculateWeaknesses = (types: string[]): WeaknessInfo[] => {
  if (types.length === 0) return []
  
  // Inicia com as fraquezas do primeiro tipo
  let weaknesses = [...(typeWeaknesses[types[0]] || [])]
  
  // Se houver segundo tipo, calcula as interações
  if (types.length > 1) {
    const secondType = types[1]
    
    // 1. Remove fraquezas que são resistências do segundo tipo
    weaknesses = weaknesses.filter(
      (weakness: string) => !typeResistances[secondType]?.includes(weakness)
    )
    
    // 2. Adiciona novas fraquezas do segundo tipo que não são resistidas pelo primeiro
    const secondTypeWeaknesses = typeWeaknesses[secondType] || []
    secondTypeWeaknesses.forEach((weakness: string) => {
      if (!typeResistances[types[0]]?.includes(weakness)) {
        weaknesses.push(weakness)
      }
    })
    
    // 3. Remove fraquezas que são imunidades de qualquer um dos tipos
    weaknesses = weaknesses.filter((weakness: string) => {
      return !typeImmunities[types[0]]?.includes(weakness) && 
             !typeImmunities[types[1]]?.includes(weakness)
    })
  }
  
  // Conta ocorrências para determinar fraquezas 4x ou 2x
  const weaknessCounts: Record<string, number> = {}
  weaknesses.forEach((type: string) => {
    weaknessCounts[type] = (weaknessCounts[type] || 0) + 1
  })
  
  // Converte para o formato WeaknessInfo
  const result = Object.keys(weaknessCounts).map(type => ({
    type,
    multiplier: weaknessCounts[type] > 1 ? 4 : 2
  }))
  
  // Ordena por multiplicador (4x primeiro)
  return result.sort((a, b) => b.multiplier - a.multiplier)
}

// Mapeamento de nomes especiais
export const PokemonNameMap: Record<string, string> = {
  'nidoran-f': 'Nidoran♀',
  'nidoran-m': 'Nidoran♂',
  'farfetchd': "Farfetch'd",
  'sirfetchd': "Sirfetch'd",
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

export const getEnglishSpeciesName = (species: PokemonSpecies | null): string => {
  if (!species) return "Unknown species"
  
  const englishGenus = species.genera.find(
    (genus: Genus) => genus.language.name === 'en'
  )

  const speciesName = englishGenus?.genus.replace(/ Pokémon$/, '') || "Unknown species"
  
  return speciesName
}

// Função para formatar a porcentagem de gênero
export const getGenderRate = (species: PokemonSpecies | null): {male: string, female: string, genderless: boolean} => {
  if (!species) return {male: '0%', female: '0%', genderless: true};
  
  // -1 significa sem gênero
  if (species.gender_rate === -1) {
    return {male: '0%', female: '0%', genderless: true};
  }

  const femalePercentage = (species.gender_rate / 8) * 100;
  const malePercentage = 100 - femalePercentage;
  
  return {
    male: `${malePercentage}%`,
    female: `${femalePercentage}%`,
    genderless: false
  };
};

// Função para formatar grupos de ovos
export const getEggGroups = (species: PokemonSpecies | null): string => {
  if (!species || !species.egg_groups.length) return 'Unknown';
  
  return species.egg_groups
    .map(group => formatPokemonName(group.name))
    .join(', ');
};

// Função para formatar ciclos de ovo
export const getEggCycle = (species: PokemonSpecies | null): string => {
  if (!species) return 'Unknown';
  
  const steps = species.hatch_counter * 255;
  return `${species.hatch_counter} (${steps} steps)`;
};