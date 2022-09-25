import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import {BiHeart} from 'react-icons/bi'
import { format } from "date-fns";
import { formatCurrency } from "../../utils/utils";
import "./style.css";
import { AuthContext } from "../../providers/auth";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
  const { addToCart,addToFavorite} = useContext(AuthContext);
  return (
    <div className="movie-card">
      <button className="favoriteBtn" onClick={()=>addToFavorite({movie,is_favorite:true})}>
        <BiHeart size={30}/> 
      </button>
      <div className="thumbMovie">
        <img src={imageUrl + movie.poster_path} alt={movie.title} />
      </div>
      <div className="contentMovie">
        <h2>{movie.title}</h2>
        <p>
          Data de lançamento:{" "}
          {format(new Date(movie.release_date), "dd/MM/yyyy")}
        </p>
        <p className="average">
          <FaStar />
          {movie.vote_average}
        </p>
        <p>Valor:{formatCurrency(movie.vote_count / movie.popularity)}</p>
        <button onClick={() => addToCart({ movie, id_cart: uuidv4() })}>
          Adicionar ao Carrinho
        </button>
        {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
      </div>
    </div>
  );
};

export default MovieCard;
