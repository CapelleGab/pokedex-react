import React from 'react';

type CardProps = {
  name: string;
  image: string;
  onClick: () => void;
};

const PokemonCard: React.FC<CardProps> = ({ name, image, onClick }) => (
  <button onClick={onClick}>
    <div className="bg-white shadow-md rounded-lg p-4 text-center">
      <img src={image} alt={name} className="w-32 h-32 mx-auto" />
      <h3 className="mt-2 text-lg font-semibold text-gray-700">{name}</h3>
    </div>
  </button>
);

export default PokemonCard;
