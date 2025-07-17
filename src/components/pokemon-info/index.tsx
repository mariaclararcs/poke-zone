"use client"

import { useEffect, useState } from "react"
import { PokemonClient, Pokemon as PokeApiPokemon } from "pokenode-ts"
import Image from "next/image"
import { useParams } from "next/navigation"

export default function PokemonInfo() {
  const [pokemon, setPokemon] = useState<PokeApiPokemon | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const params = useParams()
  const pokemonName = params.name as string

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

  useEffect(() => {
    let isMounted = true

    const fetchPokemon = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const api = new PokemonClient()
        const data = await api.getPokemonByName(pokemonName.toLowerCase())
        
        if (isMounted) {
          setPokemon(data)
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

    fetchPokemon()

    return () => {
      isMounted = false
    }
  }, [pokemonName])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p>Loading {pokemonName}...</p>
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
  '/pokezone-icon.svg'

  return (
    <div className="flex flex-col items-center gap-8 mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-6 xl:py-8 min-h-screen">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-gray-600 text-2xl">#{pokemon.id.toString().padStart(4, '0')}</h2>
        <h3 className="font-bold text-3xl capitalize">{pokemon.name}</h3>
        
        <div className="relative">
          <Image 
            src={imageUrl} 
            alt={pokemon.name}
            className="bg-gray-200 rounded-md p-1"
            width={256}
            height={256}
            priority
          />
        </div>

        <div className="flex gap-2 m-1">
          {pokemon.types.map((type, index) => (
            <span 
              key={index}
              className={`${typeColorMap[type.type.name] || 'bg-normal'} flex justify-center items-center w-24 text-background px-2 py-1 rounded-md text-sm font-medium capitalize`}
              > 
                {type.type.name}
            </span>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 w-full">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold">Height</h4>
            <p>{(pokemon.height / 10).toFixed(1)} m</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold">Weight</h4>
            <p>{(pokemon.weight / 10).toFixed(1)} kg</p>
          </div>
        </div>
      </div>
    </div>
  )
}