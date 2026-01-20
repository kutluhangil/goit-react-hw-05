import { useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
  useParams,
  useLocation,
  Link,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/tmdb-api";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();

  // ✅ Render-safe back link
  const backLink = location.state ?? "/movies";

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
    : "";

  return (
    <div>
      {/* 🔙 Go back */}
      <Link to={backLink}>← Go back</Link>

      <div>
        <img src={posterUrl} alt={movie.title} width={250} />
        <h2>{movie.title}</h2>
        <p>User score: {Math.round(movie.vote_average * 10)}%</p>

        <h3>Overview</h3>
        <p>{movie.overview}</p>

        <h3>Genres</h3>
        <p>{movie.genres.map((g) => g.name).join(", ")}</p>
      </div>

      <hr />

      {/* 🔗 Nested navigation */}
      <nav>
        <NavLink to="cast">Cast</NavLink> |{" "}
        <NavLink to="reviews">Reviews</NavLink>
      </nav>

      {/* 🔽 Nested routes */}
      <Outlet />
    </div>
  );
}
