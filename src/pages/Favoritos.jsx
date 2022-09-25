import React from 'react'
import { useContext } from "react";
import MovieCard from '../components/MovieCard/MovieCard';
import { AuthContext } from "./../providers/auth";
import './favoritos.css'

const Favoritos = () => {
const { favoritos } = useContext(AuthContext);
  return (
    <div className='favoritos container'>
        <h2 className='title'>Seus tittulos favoritos</h2>
        <div className="movies-container">
            {favoritos.map(favorito=>{
                if(favorito.is_favorite){
                    return <MovieCard movie={favorito.movie} key={favorito.movie.id}/>
                }
                return
            })}
        </div>
    </div>
  )
}

export default Favoritos