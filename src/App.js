import React, { createContext, useEffect, useState } from 'react'
import PokemonThumb from './components/PokemonThumb'
import { useNavigate } from 'react-router-dom'

export const AppContext = createContext()

const App = () => {

const navigate = useNavigate()

  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
  const [IsLogged, setIsLogged] = useState()

  const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)


    function createPokemonObject(results) {
      results.forEach(async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()
        setAllPokemons(currentList => [...currentList, data])
        await allPokemons.sort((a, b) => a.id - b.id)
      })
    }
    createPokemonObject(data.results)
  }

  useEffect(() => {
    getAllPokemons()
  }, [])



  return (
    <AppContext.Provider value={{
      IsLogged,setIsLogged}}>
    <div className="app-contaner">
      <h1>Pokemon Evolution</h1>
      <span onClick={()=>{navigate('/login')}}>Login</span>
      <span>Logout</span>
      <div className="pokemon-container">
        <div className="all-container" allPokemons={allPokemons}>
          {allPokemons.map((pokemonStats, index) =>
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