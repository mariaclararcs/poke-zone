"use client"

import { Pokemon } from "pokenode-ts"
import { useEffect, useState } from "react"
import { PokemonClient } from "pokenode-ts"
import Image from "next/image"
import Link from "next/link"

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

export default function PokemonInfo({ params }: { params: { id: string } }) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const api = new PokemonClient()
        const data = await api.getPokemonById(Number(params.id))
        setPokemon(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [params.id])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!pokemon) return <div>Pokémon not found</div>

  const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default || 
                  pokemon.sprites.front_default ||
                  '/pokezone-icon.svg'

  return (
    <div className="flex flex-col items-center gap-8 mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-6 xl:py-8 min-h-screen">
      <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-gray-600 text-2xl">#{pokemon.id.toString().padStart(4, '0')}</h2>
        <h3 className="font-bold text-3xl capitalize">{pokemon.name}</h3>
        
        <div className="relative w-64 h-64">
          <Image 
            src={imageUrl}
            alt={pokemon.name}
            fill
            className="object-contain"
            onError={(e) => {
              e.currentTarget.src = '/pokezone-icon.svg'
            }}
          />
        </div>

        <div className="flex gap-4 mt-4">
          {pokemon.types.map((type, index) => (
            <span 
              key={index}
              className={`${typeColorMap[type.type.name] || 'bg-normal'} text-white px-4 py-2 rounded-full text-sm font-bold capitalize`}
            >
              {type.type.name}
            </span>
          ))}
        </div>

        {/* Adicione mais informações do Pokémon aqui */}
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

        <Link 
          href="/pokemons" 
          className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to Pokédex
        </Link>
      </div>
    </div>
  )
}