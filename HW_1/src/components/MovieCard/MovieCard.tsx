import type { IMovie } from "../../data/movies.ts";
import React from "react";

interface MovieCardProps {
	movie: IMovie;
	onToggleFavorite: (id: number) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({movie, onToggleFavorite}) => {
	const handleFavoriteClick = () => {
		onToggleFavorite(movie.id)
	}

	return (
		<div className='MovieCard flex flex-col flex-nowrap items-center m-3'>
			<div className="MoviecCard__img">
				<img className='h-30' src={movie.posterUrl} alt=""/>
			</div>
			<div className="MovieCard__title">
				{movie.title}
			</div>
			<div className="MovieCard__year">
				{movie.year}
			</div>
			<div className="MovieCard__fav">
				{movie.isFavorite ? <div>Избранное</div> : <div>Нет в избранном</div>}
			</div>
			<button onClick={handleFavoriteClick}>Добавить в избранное</button>
		</div>
	);
};

