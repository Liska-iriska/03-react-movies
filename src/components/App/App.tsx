import { useState } from "react";
// import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import { movieService } from "../../services/movieService";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";

export default function App() {
  const [movie, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchTerm: string) => {
    setMovies([]);
    setIsLoading(true);

    try {
      const data = await movieService(searchTerm);
      if (data.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }
      setMovies(data);
    } catch {
      setMovies([]);
      toast.error("Whoops, something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {movie.length > 0 && (
        <MovieGrid movies={movie} onSelect={(id) => console.log(id)} />
      )}
    </div>
  );
}
