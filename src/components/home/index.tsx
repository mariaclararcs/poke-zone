"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import usePokemons from "@/hooks/usePokemons"
import PokemonCard from "@/components/pokemon-card"
import { PaginationFull } from "@/components/pagination"
import { z } from "zod"

export default function Home() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const limit = 30

  const currentPage = z.coerce
    .number()
    .min(1)
    .parse(searchParams.get("page") ?? "1")

  const [page, setPage] = useState(currentPage)
  const { pokemons, loading, error, count } = usePokemons(limit, (page - 1) * limit)

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    router.push(`?${params.toString()}`, { scroll: false })

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [page, router, searchParams])

  const totalPages = Math.ceil(count / limit)
  const hasNextPage = page < totalPages
  const hasPreviousPage = page > 1

  const handlePageChange = (newPage: number) => {
    setPage(newPage)

    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    router.push(`?${params.toString()}`, { scroll: false })
  }

  if (loading) return (
    <div className="flex flex-col items-center gap-12 mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-6 xl:py-8 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(limit)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-200 rounded-lg w-40 h-56" />
        ))}
      </div>
    </div>
  )
  
  if (error) return (
    <div className="flex flex-col items-center gap-12 mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-6 xl:py-8 min-h-screen">
      <div className="text-red-500">Error: {error}</div>
    </div>
  )

  return (
    <div className="flex flex-col items-center gap-8 mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-6 xl:py-8 min-h-screen">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <div className="w-full">
        <PaginationFull
          pageIndex={page}
          totalCount={count}
          perPage={limit}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}