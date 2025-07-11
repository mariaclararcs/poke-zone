"use client"

import { usePokemon } from "@/hooks/usePokemon"
import PokemonCard from "@/components/pokemon-card"

export default function Home() {
  const { pokemon, loading, error } = usePokemon('pikachu')

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="flex flex-col items-center gap-12 mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-6 xl:py-8 min-h-screen">
      <h1>Pokédex</h1>
      {pokemon && <PokemonCard pokemon={pokemon} />}
    </div>
  )
}