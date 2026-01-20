import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

// ✅ TMDB API Read Access Token (GOIT homework)
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmE0YzBjYTI2ODg2YjFjNDU3ZTdkMmY5OGRiYjI1NSIsIm5iZiI6MTc2ODk0NDk4Mi43NjcsInN1YiI6IjY5NmZmNTU2NDU1MjA2ZDE2ZTdhYzAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j0pWseOQ7QYNoiVss-iECn2qu_RIHrG4VP_jQK-lbb4";

// Axios instance (tek merkezden yönetim)
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

// 🔥 Trending movies (HomePage)
export const fetchTrendingMovies = async () => {
  const response = await api.get("/trending/movie/day");
  return response.data.results;
};

// 🔍 Search movies (MoviesPage)
export const searchMovies = async (query) => {
  const response = await api.get("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });

  return response.data.results;
};

// 🎬 Movie details (MovieDetailsPage)
export const fetchMovieDetails = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};

// 🎭 Movie cast (MovieCast)
export const fetchMovieCast = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

// 📝 Movie reviews (MovieReviews)
export const fetchMovieReviews = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};
