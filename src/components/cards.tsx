type CardProps = {
  name: string;
  image: string;
};

const PokemonCard: React.FC<CardProps> = ({ name, image }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-36 text-center">
      <img src={image} alt="" className="w-24 h-24 mx-auto" />
      <h3 className="mt-2 text-lg font-semibold text-gray-700">{name}</h3>
    </div>
  );
}

export default PokemonCard;

