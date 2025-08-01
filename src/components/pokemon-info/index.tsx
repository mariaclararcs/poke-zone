"use client"

import { useEffect, useState } from "react"
import { 
  PokemonClient, 
  Pokemon as PokeApiPokemon, 
  PokemonSpecies,
  EvolutionChain
} from "pokenode-ts"
import Image from "next/image"
import { useParams } from "next/navigation"
import {
  formatPokemonName, 
  PokemonTypeBadge, 
  getFirstTypeColor,
  getFirstRingColor,
  getEnglishSpeciesName,
  calculateWeaknesses,
  getGenderRate,
  getEggGroups,
  getEggCycle
} from "@/lib/pokemonUtils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PokemonInfo() {
  const [pokemon, setPokemon] = useState<PokeApiPokemon | null>(null)
  const [species, setSpecies] = useState<PokemonSpecies | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const params = useParams()
  const pokemonName = params.name as string

  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchPokemonData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const api = new PokemonClient()
        const pokemonData = await api.getPokemonByName(pokemonName.toLowerCase())
        
        if (isMounted) {
          setPokemon(pokemonData)
          
          // Busca os dados da espécie
          const speciesData = await api.getPokemonSpeciesByName(pokemonData.species.name)
          setSpecies(speciesData)

          // Busca a cadeia de evolução
          if (speciesData?.evolution_chain?.url) {
            try {
              const evolutionResponse = await fetch(speciesData.evolution_chain.url)
              const evolutionData = await evolutionResponse.json()
              setEvolutionChain(evolutionData)
            } catch (evolutionError) {
              console.error("Error fetching evolution chain:", evolutionError)
              setEvolutionChain(null)
            }
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(`Não foi possível carregar o Pokémon ${pokemonName}`)
          console.error("Erro na requisição:", err)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchPokemonData()

    return () => {
      isMounted = false
    }
  }, [pokemonName])

  const [renderedEvolutions, setRenderedEvolutions] = useState<React.ReactNode[]>([])

  useEffect(() => {
    if (evolutionChain && pokemon) {
      const renderEvolutionChain = async (chain: EvolutionChain) => {
        const evolutions: React.ReactNode[] = []
        const api = new PokemonClient()

        const processChain = async (currentChain: EvolutionChain['chain']) => {
          const pokemonId = currentChain.species.url.split('/').slice(-2, -1)[0]
          
          try {
            const evolutionPokemon = await api.getPokemonByName(currentChain.species.name)
            const evolutionRingColor = getFirstRingColor(evolutionPokemon)

            evolutions.push(
              <div key={currentChain.species.name} className="flex flex-col items-center">
                <Link href={`/pokemons/${currentChain.species.name}`}
                  className={`bg-white p-2 rounded-full hover:cursor-pointer ${
                  currentChain.species.name === pokemon?.name 
                    ? `ring-3 ${evolutionRingColor}` 
                    : 'ring-3 ring-gray-200'
                }`}>
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                    alt={currentChain.species.name}
                    width={100}
                    height={100}
                    className="mx-auto"
                    unoptimized
                  />
                </Link>
                <div className="flex flex-row gap-2 mt-2">
                  <p className="font-medium capitalize">
                    {formatPokemonName(currentChain.species.name)}
                  </p>
                  <p className="text-gray-600">
                    #{evolutionPokemon.id.toString().padStart(4, '0')}
                  </p>
                </div>
                <div className="flex gap-2 m-1">
                  {evolutionPokemon.types.map((type, index) => (
                    <PokemonTypeBadge 
                      key={index} 
                      type={type.type.name} 
                      className="rounded-full text-xs w-16" 
                    />
                  ))}
                </div>
              </div>
            )

            if (currentChain.evolves_to.length > 0) {
              evolutions.push(
                <div key={`arrow-${currentChain.species.name}`} className="flex items-center justify-center">
                  <ArrowRight className="text-gray-400 mx-2" />
                </div>
              )
              for (const evo of currentChain.evolves_to) {
                await processChain(evo)
              }
            }
          } catch (error) {
            console.error(`Error fetching evolution data for ${currentChain.species.name}:`, error)
          }
        }

        await processChain(chain.chain)
        return evolutions
      }

      const fetchEvolutions = async () => {
        const evolutions = await renderEvolutionChain(evolutionChain)
        setRenderedEvolutions(evolutions)
      }

      fetchEvolutions()
    }
  }, [evolutionChain, pokemon])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    )
  }

  if (!pokemon) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No Pokémon found</p>
      </div>
    )
  }

  const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default || 
                   pokemon.sprites.front_default ||
                   '/pokeball-icon.svg'

  const bgColorClass = getFirstTypeColor(pokemon)

  const weaknesses = calculateWeaknesses(
    pokemon.types.map(t => t.type.name)
  )

  const getEnglishDescription = () => {
    if (!species) return "No description available"
    
    const flavorText = species.flavor_text_entries.find(
      entry => entry.language.name === 'en'
    )
    
    return flavorText?.flavor_text || "No description available"
  }

  return (
    <div className="flex flex-col items-center gap-8 mx-auto px-4 sm:px-10 md:px-18 lg:px-24 py-6 xl:py-8 min-h-screen">
      {/* Image and Type */}
      <div className={`flex flex-col items-center gap-2 py-6 px-44 w-fit rounded-xl`}>
        <div className="flex flex-row gap-3 text-3xl">
          <h2 className="font-bold capitalize">{formatPokemonName(pokemon.name)}</h2>
          <h2 className="text-gray-600">#{pokemon.id.toString().padStart(4, '0')}</h2>
        </div>

        <div className="flex gap-2 m-1">
          {pokemon.types.map((type, index) => (
            <PokemonTypeBadge key={index} type={type.type.name} className="rounded-full text-md w-28" />
          ))}
        </div>
        
        <div className="relative">
          <Image 
            src={imageUrl} 
            alt={pokemon.name}
            className="rounded-md p-1"
            width={256}
            height={256}
            priority
          />
        </div>
      </div>

      {/* Info Details */}
      <div className="w-full max-w-4xl space-y-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-600 mb-2">Description</h4>
          <p className="">
            {getEnglishDescription()
              .replace(/\f/g, ' ')
              .replace(/\n/g, ' ')
              .replace(/POKéMON/g, 'Pokémon')
            }
          </p>  
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-600">Height</h4>
            <p className="text-lg">{(pokemon.height / 10).toFixed(1)} m</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-600">Weight</h4>
            <p className="text-lg">{(pokemon.weight / 10).toFixed(1)} kg</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-600">Base XP</h4>
            <p className="text-lg">{pokemon.base_experience}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-600">Species</h4>
            <p className="text-lg capitalize">
              {getEnglishSpeciesName(species)}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg w-fit">
            <h4 className="font-semibold text-gray-600 mb-2">Weaknesses</h4>
            <div className="flex flex-row gap-2">
              {weaknesses.map((weakness, index) => (
                <div key={index} className="relative">
                  <PokemonTypeBadge 
                    type={weakness.type} 
                    className="rounded-full text-md w-28"
                  />
                  {weakness.multiplier === 4 && (
                    <span className="absolute -top-1 -right-1 text-red-500 font-bold text-md">*</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bio Info */}
        {/*
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-600 mb-2">Biological Info</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm text-gray-500">Habitat</h5>
              <p className="capitalize">{species?.habitat?.name || 'Unknown'}</p>
            </div>
            <div>
              <h5 className="text-sm text-gray-500">Generation</h5>
              <p className="capitalize">{species?.generation?.name.replace('generation-', '').toUpperCase() || 'Unknown'}</p>
            </div>
            <div>
              <h5 className="text-sm text-gray-500">Capture Rate</h5>
              <p>{species?.capture_rate || 'Unknown'}</p>
            </div>
            <div>
              <h5 className="text-sm text-gray-500">Base Happiness</h5>
              <p>{species?.base_happiness || 'Unknown'}</p>
            </div>
          </div>
        </div>
        */}

        {/* Breeding */}
        {species && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-600 mb-2">Breeding</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Gender */}
              <div>
                <h5 className="text-sm text-gray-500 mb-1">Gender</h5>
                {getGenderRate(species).genderless ? (
                  <p>Genderless</p>
                ) : (
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <span className="w-20">Male:</span>
                      <span>{getGenderRate(species).male}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-20">Female:</span>
                      <span>{getGenderRate(species).female}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Egg Groups */}
              <div>
                <h5 className="text-sm text-gray-500 mb-1">Egg Groups</h5>
                <p className="capitalize">{getEggGroups(species)}</p>
              </div>

              {/* Egg Cycle */}
              <div>
                <h5 className="text-sm text-gray-500 mb-1">Egg Cycle</h5>
                <p>{getEggCycle(species)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Abilities */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-600 mb-2">Abilities</h4>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((ability, index) => (
              <span 
                key={index}
                className="bg-white px-3 py-1 rounded-full text-sm capitalize"
              >
                {ability.ability.name.replace('-', ' ')}
                {ability.is_hidden && " (hidden)"}
              </span>
            ))}
          </div>
        </div>

        {/* Base Stats */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-600 mb-2">Stats</h4>
          <div className="space-y-2">
            {pokemon.stats.map((stat, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{stat.stat.name.replace('-', ' ')}</span>
                  <span>{stat.base_stat}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${bgColorClass} h-2 rounded-full`} 
                    style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Moves */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-600 mb-2">Moves ({pokemon.moves.length})</h4>
          <div className="flex flex-wrap gap-2">
            {pokemon.moves.slice(0, 10).map((move, index) => (
              <span 
                key={index}
                className="bg-white px-3 py-1 rounded-full text-sm capitalize"
              >
                {move.move.name.replace('-', ' ')}
              </span>
            ))}
            {pokemon.moves.length > 10 && (
              <span className="bg-white px-3 py-1 rounded-full text-sm">
                +{pokemon.moves.length - 10} more
              </span>
            )}
          </div>
        </div>

        {/* Evolution */}
        {evolutionChain && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-600 mb-4">Evolution Chain</h4>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {renderedEvolutions}
            </div>
          </div>
        )}

        {/* Sprites */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-600 mb-2">Sprites</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {pokemon.sprites.front_default && (
              <div className="text-center">
                <p className="text-sm mb-1">Front</p>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={`${pokemon.name} front`}
                  width={96}
                  height={96}
                  className="mx-auto"
                />
              </div>
            )}
            {pokemon.sprites.back_default && (
              <div className="text-center">
                <p className="text-sm mb-1">Back</p>
                <Image
                  src={pokemon.sprites.back_default}
                  alt={`${pokemon.name} back`}
                  width={96}
                  height={96}
                  className="mx-auto"
                />
              </div>
            )}
            {pokemon.sprites.front_shiny && (
              <div className="text-center">
                <p className="text-sm mb-1">Shiny Front</p>
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={`${pokemon.name} shiny front`}
                  width={96}
                  height={96}
                  className="mx-auto"
                />
              </div>
            )}
            {pokemon.sprites.back_shiny && (
              <div className="text-center">
                <p className="text-sm mb-1">Shiny Back</p>
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={`${pokemon.name} shiny back`}
                  width={96}
                  height={96}
                  className="mx-auto"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}