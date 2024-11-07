import React, { useState, useEffect } from 'react';
import PokemonCard from '@/components/cards';
import {StatsTranslation, TypesTranslation, AbilitiesTranslation} from '@/pages/api/translation'

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
        const pokemonPromises = data.results.map(pokemon =>
          fetch(pokemon.url)
            .then(res => {
              if (!res.ok) {
                throw new Error("Erreur de requête des détails !");
              }
              return res.json();
            })
            .then(details => {
              return fetch(details.species.url)
                .then(speciesRes => {
                  if (!speciesRes.ok) {
                    throw new Error("Erreur de requête des species !");
                  }
                  return speciesRes.json();
                })
                .then(speciesData => {
                  const nameInFrench = speciesData.names.find(name => name.language.name === "fr")?.name;
                  return {
                    pokedexID: details.id,
                    nameFR: nameInFrench,
                    name: pokemon.name,
                    image: details.sprites.front_default,
                  };
                });
            })
        );
        Promise.all(pokemonPromises)
          .then(pokemonsData => {
            pokemonsData.sort((a, b) => a.pokedexID - b.pokedexID);
            setPokemons(pokemonsData);
          })
          .catch(error => {
            console.error("Erreur lors de la récupération des Pokémon :", error);
          });
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
            pokedexID={pokemon.pokedexID}
            name={pokemon.nameFR}
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
          name: StatsTranslation[stat.stat.name] || stat.stat.name,
          value: stat.base_stat,
        })),
        types: data.types.map(typeInfo =>  TypesTranslation[typeInfo.type.name] || typeInfo.type.name),
        abilities: data.abilities.map(abilityInfo => AbilitiesTranslation[abilityInfo.ability.name] || abilityInfo.ability.name ),
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

export function getPokemonInformation(id) {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur de requête !");
      }
      return response.json();
    })
    .then(data => {
      return {
        name: data.names.find(name => name.language.name === "fr")?.name,
        desc: data.flavor_text_entries.find(
          entry => entry.language.name === "fr"
        )?.flavor_text,
      };
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des statistiques :", error);
      return null;
    });

}

export function getFrenchNameAbilities() {
  const totalAbilities = 297; 

  for (let i = 1; i <= totalAbilities; i++) { 
    const url = `https://pokeapi.co/api/v2/ability/${i}`
      fetch(url)
      .then(response => {
        if(!response.ok){
          throw new Error("Erreur de requête !")
        }
        return response.json()
      })
      .then(data => {
        const englishName = data.name; 
        const frenchName = data.names.find(name => name.language.name === "fr")?.name;

        if (frenchName) {
            AbilitiesTranslation[englishName] = frenchName;
        }
      })
  }
}