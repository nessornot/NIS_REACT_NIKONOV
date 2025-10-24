import type { IMovie } from '../data/movies.ts';
import React from 'react';

interface MovieCardProps {
	movie: IMovie;
	onToggleFavorite: (id: string) => void;
	viewMode: 'grid' | 'list';
}

export const MovieCard: React.FC<MovieCardProps> = ({movie, onToggleFavorite, viewMode}) => {
	const handleFavoriteClick = () => {
		onToggleFavorite(movie.id)
	}

	// grid view
	if (viewMode === 'grid') {
		return (
			<div className='MovieCard flex flex-col flex-nowrap items-center p-1.5 bg-gray-100 rounded-lg w-full max-w-xs shadow-sm'>
				<div>
					{movie.posterUrl !== 'N/A' ?
						<img className='w-48 h-64 mt-1 rounded-md' src={movie.posterUrl} alt={movie.title}/>
						: <div className='w-48 h-64 bg-gray-200 flex flex justify-center items-center'>no image</div>}
				</div>
				<div className='text-lg text-center font-semibold mt-2'>
					{movie.title}
				</div>
				<div className='text-sm mb-3 text-gray-600'>
					{movie.year}
				</div>
				<button onClick={handleFavoriteClick} className='mt-auto text-sm underline hover:text-blue-800'>
					{movie.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
				</button>
			</div>
		);
	}

	// list view
	return (
		<div className='MovieCard flex flex-row flex-nowrap items-center w-full p-2 bg-gray-100 rounded-lg shadow-sm gap-4'>
			<div className='flex-shrink-0'>
				<img className='w-36 h-36 object-cover rounded' src={movie.posterUrl} alt={movie.title}/>
			</div>
			<div className='flex flex-col self-stretch flex-grow'>
				<div className='text-2xl font-bold text-left'>
					{movie.title}
				</div>
				<div className='text-base mb-3 text-md text-gray-600 text-left'>
					{movie.year}
				</div>
				<button onClick={handleFavoriteClick} className='mt-auto text-sm underline text-blue-600 hover:text-blue-800 self-start'>
					{movie.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
				</button>
			</div>
		</div>
	);
};
