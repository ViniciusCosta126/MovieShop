import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import './MovieGrid.css'
const moviesUrl = import.meta.env.VITE_API_LIST;
const apikey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  const topRatedMovies = async (url) => {
    const res = await fetch(url);
    const {items} = await res.json();
    
    setTopMovies(items);
  };
  useEffect(() => {
    const topRatedUrl = `${moviesUrl}?${apikey}&language=pt-BR`;
    topRatedMovies(topRatedUrl);
  }, []);


  return (
    <div className="container">
      <h2 className="title">Principais titulos:</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.length > 0 &&
        topMovies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
      </div>
    </div>
  );
};

export default Home;
