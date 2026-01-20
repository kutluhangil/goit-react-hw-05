import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/tmdb-api";

export default function MovieReviews() {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadReviews() {
      try {
        setLoading(true);
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, [movieId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>Failed to load reviews 😢</p>;
  }

  if (reviews.length === 0) {
    return <p>No reviews available.</p>;
  }

  return (
    <ul>
      {reviews.map((review) => (
        <li key={review.id}>
          <p>
            <strong>Author:</strong> {review.author}
          </p>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
