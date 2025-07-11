"use client"

import Link from "next/link"

export default function Header() {
    return (
        <header className="w-full bg-red-800 py-6">
            <div className="flex flex-row justify-between items-center container mx-auto px-4">
                <div className="flex flex-row items-center gap-6 md:gap-12 lg:gap-24">
                    <Link href="/" className="flex items-center gap-3">
                        <span className="text-[40px] leading-[42px]">PokéZone</span>
                    </Link>
                </div>

                <div></div>
            </div>
        </header>
    )
}