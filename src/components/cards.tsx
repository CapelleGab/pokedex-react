import { getPokemonStats } from "@/pages/api/pokemon";

type CardProps = {
  name: string;
  image: string;
};

const PokemonCard: React.FC<CardProps> = ({ name, image }) => {

  function hundleClick(name: String) {
    getPokemonStats(name).then(pokemonData => {
      if (pokemonData) {
        console.log(pokemonData);

      }
    });
  }

  return (
    <button onClick={() => hundleClick(name)}>
      <div className="bg-white shadow-md rounded-lg p-4 text-center">
        <img src={image} alt="" className="w-32 h-32 mx-auto" />
        <h3 className="mt-2 text-lg font-semibold text-gray-700">{name}</h3>
      </div>
    </button>
  );
}

export default PokemonCard;

