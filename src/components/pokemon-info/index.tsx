"use client"

import { useEffect, useState } from "react"
import { PokemonClient, Pokemon as PokeApiPokemon } from "pokenode-ts"
import Image from "next/image"
import { useParams } from "next/navigation"
import { formatPokemonName, PokemonTypeBadge, getFirstTypeColor } from "@/lib/pokemonUtils"

export default function PokemonInfo() {
  const [pokemon, setPokemon] = useState<PokeApiPokemon | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const params = useParams()
  const pokemonName = params.name as string

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
  '/pokezone-icon.svg'

  const bgColorClass = getFirstTypeColor(pokemon)

  return (
    <div className="flex flex-col items-center gap-8 mx-auto px-4 sm:px-10 md:px-18 lg:px-24 py-6 xl:py-8 min-h-screen">
      <div className={`flex flex-col items-center gap-2 py-6 px-44 ${bgColorClass} w-fit rounded-xl`}>
        <div className="flex flex-row gap-3 text-3xl">
          <h2 className="font-bold capitalize">{formatPokemonName(pokemon.name)}</h2>
          <h2 className="text-gray-600">#{pokemon.id.toString().padStart(4, '0')}</h2>
        </div>

        <div className="flex gap-2 m-1">
          {pokemon.types.map((type, index) => (
            <PokemonTypeBadge key={index} type={type.type.name} className="rounded-2xl text-md w-28" />
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

      <div className="flex flex-col gap-2">
        <h4>Description</h4>
        <h4>Species</h4>
        <h4>Abilities</h4>
        <h4>Gender</h4>
        <h4>Weaknesses</h4>

        <div className="grid grid-cols-2 gap-4 w-full">
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