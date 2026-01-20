import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/tmdb-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!query) return;

    async function loadMovies() {
      try {
        setLoading(true);
        const data = await searchMovies(query);
        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.search.value.trim();
    if (!value) return;

    setSearchParams({ query: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          name="search"
          defaultValue={query}
          className={css.input}
          placeholder="Search movies..."
          autoComplete="off"
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong 😢</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
