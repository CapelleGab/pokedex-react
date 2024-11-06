import React, { useState, useEffect } from 'react';
import PokemonCard from '@/components/cards';

export default function GetPokemonList({ onPokemonClick }) {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0";

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur de requête !");
        }
        return response.json();
      })
      .then(data => {
        const pokemonsData = data.results.map(pokemon => ({
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`
        }));
        setPokemons(pokemonsData);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []); 

  return (
    <>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-5 gap-4">
        {pokemons.map((pokemon, index) => (
          <PokemonCard
            key={index}
            name={pokemon.name}
            image={pokemon.image}
            onClick={() => onPokemonClick(pokemon.name)}
          />
        ))}
      </div>
    </>
  );
}

export function getPokemonStats(name) {
  const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur de requête !");
      }
      return response.json();
    })
    .then(data => {
      return {
        name: data.name,
        stats: data.stats.map(stat => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })),
        types: data.types.map(typeInfo => typeInfo.type.name),
        abilities: data.abilities.map(abilityInfo => abilityInfo.ability.name),
        image: data.sprites.front_default,
        imageShiny: data.sprites.front_shiny,
        id: data.id
      };
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des statistiques :", error);
      return null;
    });
}
