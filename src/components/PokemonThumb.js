import React from 'react'
import { useNavigate } from 'react-router-dom';

const PokemonThumb = ({ id, image, name, type, _callback, allPokemons }) => {
    const style = type + " thumb-container";
    const navigate = useNavigate()

    return (
        <div className={style} onClick={() => { navigate('/Details') }}>
            <div className="number"><small>#0{id}</small></div>
            <img className='image' src={image} alt={name} />
            <div className="detail-wrapper" >
                <h3
                    className='name'>{name}</h3>
                <span>Type: {type}</span>
            </div>
            <div className="all-container">
                {/* {allPokemons.map( ( index) => 
     
              key={index}
              image={pokemonStats.sprites.other.dream_world.front_default}
              id={pokemonStats.id}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />)} */}

            </div>
        </div>
    )
}

export default PokemonThumb