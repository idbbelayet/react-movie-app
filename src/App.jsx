import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import Search from "./components/Search";
const API_BASE_URL = import.meta.env.VITE_TMDB_API_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = `${API_BASE_URL}`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      if (data.response === 'false') {
        setErrorMessage(data.error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }
      setMovieList(data.results);
console.log(data.results);

    }
    catch (error) {
      console.error(`Error fetching movies:${error}`);
      setErrorMessage("An error occurred while fetching movies. Please try again later.");
    }
    finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    fetchMovies()
  }
    , []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2 className="mt-5">All Movies</h2>
          {
            isLoading ? (
              <p className="text-white">Loading...</p>
            ):errorMessage?(<p className="text-red-500">{errorMessage}</p>):(
             <ul>
                {movieList.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}/>
                   
                ))}
                </ul>
            )
          
          }
        </section>
      </div>
    </main>
  )
}

export default App
