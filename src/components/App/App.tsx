import { useState } from "react";
import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import axios from "axios";

export default function App() {
  const [movie, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (searchTerm: string) => {
    try {
      setIsLoading(true);
      setIsError(false);

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
      setIsLoading(false);
      setMovies(response.data.results);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <p>Loading data, please wait...</p>}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {movie.length > 0 && (
        <ul>
          {movie.map(({ title, poster_path, id }) => (
            <li key={id}>
              <a
                href={`https://image.tmdb.org/t/p/w500${poster_path}`}
                target="_blank"
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
//   const handleSearch = (searchTerm: string) => {
//     console.log("Шукаємо:", searchTerm);
//   };
//   return (
//     <>
//       <Toaster />
//       <SearchBar onSubmit={handleSearch} />
//     </>
//   );
// }
