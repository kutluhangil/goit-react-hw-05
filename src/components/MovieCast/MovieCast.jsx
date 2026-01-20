import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/tmdb-api";

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
    <ul>
      {cast.map((actor) => (
        <li key={actor.cast_id}>
          <p>
            <strong>{actor.name}</strong>
          </p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}
