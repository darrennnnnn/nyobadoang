"use client"

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

interface Pokemon {
    name: string;
    sprites: {
        front_default: string;
    };
}

export default function Home() {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get<Pokemon>(
                    "https://pokeapi.co/api/v2/pokemon/1"
                );
                setPokemon(response.data);
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            }
        };

        fetchPokemon();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {pokemon ? (
                <div>
                    <h1>{pokemon.name}</h1>
                    <Image
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        width={200}
                        height={200}
                    />
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </main>
    );
}
