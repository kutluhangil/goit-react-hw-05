import { useEffect, useState, useRef } from "react";
import {
  NavLink,
  Outlet,
  useParams,
  useLocation,
  Link,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/tmdb-api";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.navLink, isActive && css.activeNavLink);
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadMovie() {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch {
        setError(true);
      }
    }

    loadMovie();
  }, [movieId]);

  if (error) {
    return <p>Something went wrong 😢</p>;
  }

  if (!movie) {
    return <p>Loading...</p>;
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  return (
    <div>
      <Link to={backLinkRef.current} className={css.backLink}>
        ← Go back
      </Link>

      <div className={css.detailsContainer}>
        <img
          src={posterUrl}
          alt={movie.title}
          className={css.poster}
        />
        <div className={css.info}>
          <h2 className={css.title}>
            {movie.title} <span className={css.year}>({movie.release_date.split("-")[0]})</span>
          </h2>
          <p className={css.score}>
            User Score: <span className={css.scoreValue}>{Math.round(movie.vote_average * 10)}%</span>
          </p>

          <h3 className={css.heading}>Overview</h3>
          <p className={css.overview}>{movie.overview}</p>

          <h3 className={css.heading}>Genres</h3>
          <p className={css.genres}>
            {movie.genres.map((g) => g.name).join(", ")}
          </p>
        </div>
      </div>

      <div className={css.additionalInfo}>
        <h3 className={css.subHeading}>Additional Information</h3>
        <nav className={css.nav}>
          <NavLink to="cast" className={buildLinkClass}>
            Cast
          </NavLink>
          <NavLink to="reviews" className={buildLinkClass}>
            Reviews
          </NavLink>
        </nav>
      </div>

      <Outlet />
    </div>
  );
}
