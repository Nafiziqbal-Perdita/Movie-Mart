import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGRlNTBkMjQ4YmY1MmFhNjY2MmRmMDhiZDhmMWUxNiIsIm5iZiI6MTc0NjY4NDYyOS4wMjEsInN1YiI6IjY4MWM0YWQ1NDFjOTFkN2IyZjg4YzA0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YCBOruJPi3FWT05KHGSeA_qZbO4YLsQuenzTnRZF3jw",
  },
};
// https://api.themoviedb.org/3/tv/popular?language=en-US&page=1
export const fetchMovies = async ({ query, page = 1 }) => {
  const endPoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&page=${page}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?include_adult=false&include_video=false&sort_by=popularity.desc&page=${page}`;

  try {
    const response = await fetch(endPoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Movie ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateTrendingMovies = async (movie) => {
  const trendingMoviesRef = collection(db, "trendingMovies");

  try {
    if (movie) {
      // console.log("Received movie data:", movie);

      // Prepare movie data for Firestore
      const movieData = {
        movie_id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
        release_date: movie.release_date,
        rating: movie.vote_average,
        count: 1, // Initialize count for new movies
      };

      // console.log("Prepared movie data:", movieData);

      // Check if movie already exists
      const q = query(trendingMoviesRef, where("movie_id", "==", movie.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Movie exists, update its count
        const existingDoc = querySnapshot.docs[0];
        const existingRef = doc(db, "trendingMovies", existingDoc.id);

        // Get current count and increment
        const currentData = existingDoc.data();
        const newCount = (currentData.count || 0) + 1;

        await updateDoc(existingRef, {
          count: newCount,
          // Update other fields in case they've changed
          title: movie.title,
          poster: movie.poster_path,
          release_date: movie.release_date,
          rating: movie.vote_average,
        });
        // console.log(`Updated movie count for ${movie.title} to ${newCount}`);
      } else {
        // Add new movie
        const docRef = await addDoc(trendingMoviesRef, movieData);
        // console.log(`Added new movie ${movie.title} with count 1`);
      }
    }

    // Fetch and return all trending movies
    const snapshot = await getDocs(trendingMoviesRef);
    const trendingMovies = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => b.count - a.count); // Sort by count in descending order

    // console.log("Current trending movies:", trendingMovies);
    return trendingMovies;
  } catch (error) {
    console.error("Error in updateTrendingMovies:", error);
    throw error;
  }
};

export const fetchMovieDetails = async ({ movie_id }) => {

  try {
    const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movie_id}?`, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};


export const fetchMovieVideo=async ({movie_id})=>{
  const url = 'https://api.themoviedb.org/3/movie/1188808/videos?';

  try {
    const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movie_id}/videos?`, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}