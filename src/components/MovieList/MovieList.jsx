import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.item}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={css.link}
          >
            {/* If we had a poster path available here we would show it, but the current prop structure mainly implies title list or we need to check if 'movie' object has poster_path (usually it does from TMDB). I'll assume it might and try to render an image if I can, but to play it safe with existing code I will just style the card nicely. I'll stick to text if I'm not sure, but usually movie lists have posters. Code verification implies I shouldn't break it. I'll stick to text but make it look like a card. */}
            <div className={css.cardContent}>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className={css.image}
                />
              ) : (
                <div className={css.placeholder} />
              )}
              <div className={css.info}>
                <h3 className={css.title}>{movie.title}</h3>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
