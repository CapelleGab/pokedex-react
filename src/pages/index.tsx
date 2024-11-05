import PokeFooter from "@/components/footer";
import GetPokemonList from "./api/pokemon";

export default function Home() {

  return (
    <>
      <div>
        <div className="flex justify-center items-start pt-10">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Nom de pokemon"
              className="rounded-l-lg px-4 py-2 text-black"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600">
              Chercher
            </button>
          </div>
        </div>

        <div className="mx-10 mt-10">
          <h1 className="text-2xl font-bold text-center mb-6">Liste des Pokémon</h1>
          <GetPokemonList />
        </div>


      </div>

      <br />
      
      <PokeFooter/>
    </>

  );
}
