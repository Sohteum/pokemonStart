import React, { createContext, useEffect, useState } from 'react'
import PokemonThumb from './components/PokemonThumb'
import { useNavigate } from 'react-router-dom'

export const AppContext = React.createContext<any|[]|null>(null)

const App = () => {

const navigate = useNavigate()

  const [allPokemons, setAllPokemons] = useState<any[]>([])
  const [loadMore, setLoadMore] = useState<any>('https://pokeapi.co/api/v2/pokemon?limit=20')
  const [IsLogged, setIsLogged] = useState<any>(true)

  const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)


    function createPokemonObject(results:any) {
      results.map(async => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()
        setAllPokemons(currentList => [...currentList, data])
      });
    }
    createPokemonObject(data.results)
  }

  useEffect(() => {
    getAllPokemons()
  }, [])



  return (
    <AppContext.Provider value={IsLogged}>
    <div className="app-contaner">
      <h1>Pokemon Evolution</h1>
      <span onClick={()=>{navigate('/login')}}>Login</span>
      <span>Logout</span>
      <div className="pokemon-container">
        <div className="all-container" allPokemons={allPokemons}>
          {allPokemons.map((pokemonStats:any, index:any) =>
            <PokemonThumb 
              key={index}
              image={pokemonStats.sprites.other.dream_world.front_default}
              id={pokemonStats.id}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />)}

        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>Load more</button>
      </div>
    </div>
    </AppContext.Provider>
  );
}

export default App;