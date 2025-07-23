"use client"

import { Button } from "../ui/button"

export default function PokemonSearch() {
    return (
        <div className="w-full flex flex-col items-center justify-center bg-green-400 px-4 sm:px-8 md:px-12 lg:px-20 py-6 xl:py-4">
            <div className="flex w-full max-w-sm items-center gap-2">
                <input type="text" className="bg-background" />
                <Button type="submit" variant="outline">
                    Subscribe
                </Button>
            </div>
        </div>
    )
}