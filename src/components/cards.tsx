import React from 'react';

type CardProps = {
  name: string;
  image: string;
  pokedexID: number;
  onClick: () => void;
};

const PokemonCard: React.FC<CardProps> = ({ name, image, pokedexID, onClick }) => (
  <button onClick={onClick}>
    <div className="bg-white shadow-md rounded-lg p-4 text-center">
      <h3 className='text-gray-700 text-left'># {pokedexID}</h3>

      <img src={image} alt={name} className="w-32 h-32 mx-auto" />
      <h3 className="mt-2 text-lg font-semibold text-gray-700">{name}</h3>
    </div>
  </button>
);

export default PokemonCard;
