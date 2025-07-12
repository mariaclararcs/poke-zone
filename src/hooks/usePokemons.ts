import { useState, useEffect } from "react"
import { PokemonClient, Pokemon } from "pokenode-ts"

const api = new PokemonClient()

export default function usePokemons(limit = 20, offset = 0) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true)
        const list = await api.listPokemons(offset, limit)
        setCount(list.count)
        
        // Busca os detalhes de cada Pokémon
        const details = await Promise.all(
          list.results.map(p => api.getPokemonByName(p.name))
        )
        
        setPokemons(details)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchPokemons()
  }, [limit, offset])

  return { pokemons, loading, error, count }
}