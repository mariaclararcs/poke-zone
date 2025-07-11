import { useState, useEffect } from "react"
import api from "@/app/services/pokeapi"

export function usePokemon(nameOrId: string | number) {
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await api.getPokemonByName(nameOrId.toString())
        setPokemon(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [nameOrId])

  return { pokemon, loading, error }
}