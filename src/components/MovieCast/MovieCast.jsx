import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/tmdb-api";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCast() {
      try {
        setLoading(true);
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadCast();
  }, [movieId]);

  if (loading) {
    return <p>Loading cast...</p>;
  }

  if (error) {
    return <p>Failed to load cast 😢</p>;
  }

  if (cast.length === 0) {
    return <p>No cast information available.</p>;
  }

  return (
    <ul className={css.list}>
      {cast.map((actor) => (
        <li key={actor.cast_id} className={css.item}>
          {actor.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
              alt={actor.name}
              className={css.image}
            />
          ) : (
            <div className={css.placeholder} />
          )}
          <div className={css.info}>
            <p className={css.name}>{actor.name}</p>
            <p className={css.character}>{actor.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
