"use client"

import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { FormEvent, useState } from "react"

interface PokemonSearchProps {
  onSearch: (searchTerm: string) => void
}

export default function PokemonSearch({ onSearch }: PokemonSearchProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        
        if (!searchTerm.trim()) {
            setError("Please enter a Pokémon name or number")
            return
        }

        setError("")
        onSearch(searchTerm.trim().toLowerCase())
    }

    return (
        <div className="w-full flex flex-col gap-2 items-center justify-center px-4 sm:px-8 md:px-12 lg:px-20 py-4 xl:py-6">
            <form onSubmit={handleSubmit}
                className="relative flex w-full max-w-md items-center gap-2">
                <Input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-12"
                />
                <Button 
                    type="submit" 
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-background border-1 border-input text-foreground hover:bg-muted-foreground"
                    aria-label="Search Pokémon"
                >
                    <Search className="h-4 w-4" />
                </Button>
            </form>

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
            
            <p className="text-sm text-muted-foreground">
                Search for a Pokémon by name or Pokédex number
            </p>
        </div>
    )
}