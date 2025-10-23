import React, {useRef, useState} from "react";
import {type IMovie} from "./data/movies.ts";
import {MovieCard} from "./components/MovieCard/MovieCard.tsx";

type FilterMode = 'all' | 'favorites';
type ViewMode = 'grid' | 'list';

const App: React.FC = () => {

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      setError("Enter a movie title to search.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setMovies([]);

    try {
      const api_key = "api key" // will be in .env later

      const response = await fetch(`https://www.omdbapi.com/?apikey=${api_key}&s=${searchQuery}`);
      const data = await response.json();

      if (data.Response === "True") {
        const fetchedMovies: IMovie[] = data.Search.map((movie: any) => ({
          id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          posterUrl: movie.Poster,
          isFavorite: false,
        }));
        setMovies(fetchedMovies);
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch (e) {
      setError("Failed to fetch movies");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (movieId: string) => {
    setMovies(prevMovies => prevMovies.map(movie => {
      if (movie.id === movieId) {
        return {...movie, isFavorite: !movie.isFavorite };
      }
      return movie;
    }));
  };

  const handleToggleViewMode = () => {
    if (viewMode === 'grid') {
      setViewMode('list');
    } else {
      setViewMode('grid')
    }
  }

  const visibleMovies = movies.filter(movie => {
    if (filterMode === 'favorites') {
      return movie.isFavorite;
    }
    return true;
  });

  const containerClasses = viewMode === 'grid'
    ? 'CardsContainer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center pt-2'
    : 'CardsContainer flex flex-col items-center gap-4 pt-2';

  const renderContent = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div className="text-red-500 font-bold mt-4">{error}</div>;
    }
    if (hasSearched && visibleMovies.length === 0) {
      return <div>No films found.</div>
    }
    if (!hasSearched) {
      return <div>Start by searching for a movie above.</div>
    }

    return visibleMovies.map(movie => (
      <MovieCard
        movie={movie}
        key={movie.id}
        onToggleFavorite={handleToggleFavorite}
        viewMode={viewMode}
      />
    ));
  }

  return (
    <div className="flex flex-col flex-nowrap items-center">
      <div className="controls p-1.5 h-10 bg-gray-400/90 w-full sticky top-0 z-3">

        <div className="container max-w-4xl m-auto flex flex-row flex-wrap justify-around">
          <button
            className="mr-5 h-7 w-10 rounded-sm hover:bg-gray-400 transition-colors delay-[25ms] active:bg-gray-500"
            onClick={() => setFilterMode('all')}
            disabled={filterMode === 'all'}
          >
            All
          </button>
          <button
            className="mr-5 h-7 w-22 rounded-sm hover:bg-gray-400 transition-colors delay-[25ms] active:bg-gray-500"
            onClick={() => setFilterMode('favorites')}
            disabled={filterMode === 'favorites'}
          >
            Favorites
          </button>
          <button
            className="h-7 px-2 rounded-sm hover:bg-gray-400 transition-colors delay-[25ms] active:bg-gray-500"
            onClick={handleToggleViewMode}
          >
            {viewMode === 'grid' ? 'Show as list' : 'Show as grid'}
          </button>

          <form onSubmit={handleSearchSubmit}>
            <input
              className="h-7 w-45 rounded-sm hover:bg-gray-400 transition-colors delay-[25ms] focus:bg-gray-400"
              type="text"
              placeholder="Start typing..."
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </div>

      <div className="container max-w-4xl">
        <div className={containerClasses}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default App;
