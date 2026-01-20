import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/tmdb-api";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadTrending() {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (err) {
        setError(true);
      }
    }

    loadTrending();
  }, []);

  if (error) {
    return <p>Something went wrong 😢</p>;
  }

  return (
    <div>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
}
