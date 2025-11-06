import React from 'react';
import type { IMovie } from '../data/movies.ts';
import { MovieCard } from './MovieCard.tsx';
import type { FilterMode, ViewMode } from '../App.tsx';

interface MovieListProps {
	movies: IMovie[];
	isLoading: boolean;
	error: string | null;
	hasSearched: boolean;
	filterMode: FilterMode;
	viewMode: ViewMode;
	onToggleFavorite: (id: string) => void;
}

export const MovieList: React.FC<MovieListProps> =
	({ movies, isLoading, error, hasSearched, filterMode, viewMode, onToggleFavorite }) => {
	const containerClasses = viewMode === 'grid'
		? 'CardsContainer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center pt-2'
		: 'CardsContainer flex flex-col items-center gap-4 pt-2';

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div className='text-red-500 font-bold mt-4'>{error}</div>;
	}
	if (movies.length === 0) {
		if (filterMode === 'favorites') {
			return <div>No movies in favorites</div>;
		}
		if (hasSearched) {
			return <div>No films found for your request</div>;
		}
		return <div>Search any movie</div>;
	}

	return (
		<div className={containerClasses}>
			{movies.map(movie => (
				<MovieCard
					movie={movie}
					key={movie.id}
					onToggleFavorite={onToggleFavorite}
					viewMode={viewMode}
				/>
			))}
		</div>
	);
};
