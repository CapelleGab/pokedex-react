import { RiCloseLine  } from "react-icons/ri";

export type PokemonOverlayProps = {
  name: string;
  image: string;
  stats: Array<{ name: string; value: number }>;
  types: string[];
  abilities: string[];
  onClose?: () => void;
};
const PokemonOverlay: React.FC<PokemonOverlayProps> = ({ name, image, stats, types, abilities, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black text-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 relative">
          <button onClick={onClose} className="absolute top-2 right-2 hover:text-gray-700">
            <RiCloseLine size={22} />
          </button>
          <img src={image} alt={name} className="w-32 h-32 mx-auto" />
          <h2 className="text-2xl font-bold text-center text-black mt-4">{name}</h2>
          <div className="mt-4">
            <h3 className="font-semibold">Types:</h3>
            <p>{types.join(', ')}</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Abilities:</h3>
            <p>{abilities.join(', ')}</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Stats:</h3>
            <ul>
              {stats.map(stat => (
                <li key={stat.name}>{stat.name}: {stat.value}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  
export default PokemonOverlay;
