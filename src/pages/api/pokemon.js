import React, { useState, useEffect } from 'react';
import PokemonCard from '@/components/cards'

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const requete = "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0";

    fetch(requete)
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur de requête !");
        }
        return response.json();
      })
      .then(data => {
        const promises = data.results.map(pokemon =>
          fetch(pokemon.url)
            .then(res => res.json())
            .then(details => ({
              name: pokemon.name,
              image: details.sprites.front_default
            }))
        );

        Promise.all(promises).then(pokemonsWithImages => {
          setPokemons(pokemonsWithImages);
        });
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Liste des Pokémon</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {pokemons.map((pokemon, index) => (
          <PokemonCard key={index} name={pokemon.name} image={pokemon.image} />
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
