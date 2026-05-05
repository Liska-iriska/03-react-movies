import { useState } from "react";
// import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import axios from "axios";

export default function App() {
  const [movie, setMovies] = useState<Movie[]>([]);

  const handleSearch = async (searchTerm: string) => {
    setMovies([]);
    try {
      interface HTTPResponse {
        results: Movie[];
      }

      const response = await axios.get<HTTPResponse>(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            query: searchTerm,
          },
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        },
      );

      if (response.data.results.length === 0) {
        setMovies([]);
        toast.error("No movies found for your request.");

        return;
      }
      setMovies(response.data.results);
    } catch {
      setMovies([]);
      toast.error("Whoops, something went wrong!");
    }
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {movie.length > 0 && (
        <MovieGrid movies={movie} onSelect={(id) => console.log(id)} />
      )}
    </>
  );
}
