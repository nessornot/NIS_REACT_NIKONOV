import React, {useRef, useState} from "react";
import {MOVIES_DATA, type IMovie} from "./data/movies.ts";
import {MovieCard} from "./components/MovieCard/MovieCard.tsx";

type FilterMode = 'all' | 'favorites';
type ViewMode = 'grid' | 'list';

const App: React.FC = () => {
  const [movies, setMovies] = useState<IMovie[]>(MOVIES_DATA);
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleToggleFavorite = (movieId: number) => {
    setMovies(prevMovies => prevMovies.map(movie => {
      if (movie.id == movieId) {
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
  }).filter(movie => {
    const movieTitle = movie.title.toLowerCase();
    const query = searchQuery.toLowerCase();
    return movieTitle.includes(query);
  })

  const containerClasses = viewMode === 'grid'
    ? 'CardsContainer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center pt-2'
    : 'CardsContainer flex flex-col items-center gap-4 pt-2';

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

          <input
            className="h-7 w-45 rounded-sm hover:bg-gray-400 transition-colors delay-[25ms] focus:bg-gray-400"
            type="text"
            placeholder="Start typing..."
            ref={searchInputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="container max-w-4xl">
        <div className={containerClasses}>
          {visibleMovies.length != 0 ? visibleMovies.map(movie => (
            <MovieCard
              movie={movie}
              key={movie.id}
              onToggleFavorite={handleToggleFavorite}
              viewMode={viewMode}
            />
          )) : <div>No films</div>}
        </div>
      </div>
    </div>
  );
};

export default App;
