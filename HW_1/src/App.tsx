import React, { useState, useRef } from 'react';
import {type IMovie, type TOmdbResponse} from './data/movies.ts';
import {SearchBar} from './components/SearchBar.tsx';
import {Controls} from './components/Controls.tsx';
import {MovieList} from './components/MovieList.tsx';

export type FilterMode = 'all' | 'favorites';
export type ViewMode = 'grid' | 'list';

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<IMovie[]>([]);
  const [favorites, setFavorites] = useState<Map<string, IMovie>>(new Map());

  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [activeSearch, setActiveSearch] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchInputRef.current?.value || '';
    setActiveSearch(query);

    if (filterMode === 'favorites') {
      setHasSearched(true);
      return;
    }

    if (query.trim() === '') {
      setError('Enter a movie title to search.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setSearchResults([]);

    try {
      const api_key = import.meta.env.VITE_OMDB_API_KEY;
      const response = await fetch(`https://www.omdbapi.com/?apikey=${api_key}&s=${query}`);
      const data: TOmdbResponse = await response.json();

      if (data.Response === 'True') {
        const fetchedMovies: IMovie[] = data.Search.map((movie) => ({
          id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          posterUrl: movie.Poster,
          isFavorite: favorites.has(movie.imdbID),
        }));
        setSearchResults(fetchedMovies);
      } else {
        setError(data.Error);
        setSearchResults([]);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(`Failed to fetch movies: ${e.message}`);
      } else {
        setError('Unknown error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (movieId: string) => {
    setFavorites(prevFavorites => {
      const newFavorites = new Map(prevFavorites);
      const movieInFavorites = newFavorites.get(movieId);

      if (movieInFavorites) {
        newFavorites.delete(movieId);
      } else {
        const allMovies = [...searchResults, ...Array.from(prevFavorites.values())];
        const movieToAdd = allMovies.find(m => m.id === movieId);
        if (movieToAdd) {
          newFavorites.set(movieId, { ...movieToAdd, isFavorite: true });
        }
      }
      return newFavorites;
    });

    setSearchResults(prevResults => prevResults.map(movie => {
        if (movie.id === movieId) {
          return { ...movie, isFavorite: !movie.isFavorite };
        }
        return movie;
      })
    );
  };

  const handleToggleViewMode = () => {
    setViewMode(prevMode => (prevMode === 'grid' ? 'list' : 'grid'));
  }

  const handleFilterChange = (mode: FilterMode) => {
    setFilterMode(mode);
    setActiveSearch('');
    setError(null);
    setHasSearched(false);
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  };

  const visibleMovies = filterMode === 'favorites'
    ? Array.from(favorites.values()).filter(movie =>
      movie.title.toLowerCase().includes(activeSearch.toLowerCase())
    ) : searchResults;

  return (
    <div className='flex flex-col flex-nowrap items-center'>
      <div className='controls p-1.5 h-10 bg-gray-400/90 w-full sticky top-0 z-3'>

        <div className='container max-w-4xl m-auto flex flex-row flex-wrap justify-around'>
         <Controls
           filterMode={filterMode}
           onFilterChange={handleFilterChange}
           viewMode={viewMode}
           onViewModeChange={handleToggleViewMode}
         />

          <SearchBar
            ref={searchInputRef}
            onSubmit={handleSearchSubmit}
          />
        </div>
      </div>

      <div className='container max-w-4xl'>
          <MovieList
            movies={visibleMovies}
            isLoading={isLoading}
            error={error}
            hasSearched={hasSearched}
            filterMode={filterMode}
            viewMode={viewMode}
            onToggleFavorite={handleToggleFavorite}
          />
      </div>
    </div>
  );
};

export default App;
