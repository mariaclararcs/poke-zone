"use client"

import Image from "next/image"
import Link from "next/link"

export default function Header() {
    return (
        <header className="w-full bg-primary py-6">
            <div className="flex flex-row justify-start gap-3 items-center px-4">
                <Image 
                    src="/pokeball-icon.svg"
                    alt="Pokeball Icon"
                    className=""
                    width={58}
                    height={58}
                />
                <div className="flex flex-row gap-6 md:gap-12 lg:gap-24">
                    <Link href="/" className="flex items-center gap-3">
                        <span className="text-[40px] font-bold">PokéZone</span>
                    </Link>
                </div>

                <div></div>
            </div>
        </header>
    )
}