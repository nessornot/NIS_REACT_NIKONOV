import React, {useRef, useState} from "react";
import {MOVIES_DATA, type IMovie} from "./data/movies.ts";
import {MovieCard} from "./components/MovieCard/MovieCard.tsx";

type FilterMode = 'all' | 'favorites';

const App: React.FC = () => {
  const [movies, setMovies] = useState<IMovie[]>(MOVIES_DATA);
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleToggleFavorite = (movieId: number) => {
    setMovies(prevMovies => prevMovies.map(movie => {
      if (movie.id == movieId) {
        return {...movie, isFavorite: !movie.isFavorite };
      }
      return movie;
    }));
  };

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

  return (
    <div className="flex flex-col flex-nowrap items-center">
      <div className="controls flex flex-row flex-wrap m-3">
        <button className="FilterMode mr-5" onClick={() => setFilterMode('all')} disabled={filterMode === 'all'}>
          Все
        </button>
        <button className="FilterMode mr-5" onClick={() => setFilterMode('favorites')} disabled={filterMode === 'favorites'}>
          Избранное
        </button>
        <input
          type="text"
          placeholder="Начните вводить..."
          ref={searchInputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='flex flex-row flex-wrap'>
        {visibleMovies.length != 0 ? visibleMovies.map(movie => (
        <MovieCard movie={movie} key={movie.id} onToggleFavorite={handleToggleFavorite} ></MovieCard>
      )) : <div>Фильмов нет</div>}
    </div>
    </div>
  );
};

export default App;
