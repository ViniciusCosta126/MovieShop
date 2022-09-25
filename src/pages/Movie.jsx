import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
  BsCalendar,
  BsCash
} from "react-icons/bs";
import {format} from 'date-fns'
import {formatCurrency} from '../utils/utils'
import { useContext } from "react";
import { AuthContext } from "../providers/auth";
import { v4 as uuidv4 } from "uuid";

const moviesUrl = import.meta.env.VITE_API;
const apikey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;


import "./Movie.css";
const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { addToCart } = useContext(AuthContext);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovie(data);
  };
  useEffect(() => {
    const movieUrl = `${moviesUrl}${id}?${apikey}&language=pt-BR`;
    getMovie(movieUrl);
  });
  
  return (
    <div className="movie-page">
      <div className="container">
      {movie && (
        <>
          
          <img src={imageUrl + movie.poster_path} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p className="tagline">{movie.tagline}</p>
          <div className="info">
            <h3>
              <BsWallet2 />
              Orçamento:
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>
          <div className="info">
            <h3>
              <BsGraphUp />
              Receita:
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
          <div className="info">
            <h3>
              <BsCalendar />
              Data de Lançamento:
            </h3>
            <p>{format(new Date(movie.release_date), 'dd/MM/yyyy')}</p>
          </div>
          <div className="info">
            <h3>
              <BsHourglassSplit />
              Duraçao:
            </h3>
            <p>{movie.runtime} minutos</p>
          </div>
          <div className="info">
            <h3>
              <BsCash />
              Valor para Compra:
            </h3>
            <p>R${(movie.vote_count/movie.popularity).toFixed(2)}</p>
          </div>
          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill />
              Descricao:
            </h3>
            <p>{movie.overview}</p>
          </div>
          <button onClick={() => addToCart({ movie, id_cart: uuidv4() })}>Adicionar ao Carrinho</button>
        </>
      )}
      </div>
    </div>
  );
};

export default Movie;
