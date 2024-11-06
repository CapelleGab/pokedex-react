import { RiCloseLine } from "react-icons/ri";
import Container from "./container";

export type PokemonOverlayProps = {
  name: string;
  image: string;
  imageShiny: string
  stats: Array<{ name: string; value: number }>;
  types: string[];
  id: number;
  abilities: string[];
  onClose?: () => void;
};
const PokemonOverlay: React.FC<PokemonOverlayProps> = ({ name, image, stats, types, abilities, imageShiny, id, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black text-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[40%] h-auto relative capitalize">
        <button onClick={onClose} className="absolute top-2 right-2 hover:text-gray-700">
          <RiCloseLine size={30} />
        </button>

        <p># {id}</p>

        <div className="flex">
          <img src={image} alt={name} className="w-64 h-64 mx-auto" />
          <img src={imageShiny} alt={name} className="w-64 h-64 mx-auto" />
        </div>

        <h2 className="text-2xl font-bold text-center text-black mb-4">{name}</h2>
        <Container>
          <div className="mt-4">
            <h3 className="font-semibold">Types:</h3>
            <p>{types.join(', ')}</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Abilities:</h3>
            <p>{abilities.join(', ')}</p>
          </div>

          <div className="mt-4 mb-4">
            <h3 className="font-semibold">Stats:</h3>
            <ul>
              {stats.map(stat => (
                <li key={stat.name}>{stat.name}: {stat.value}</li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default PokemonOverlay;


