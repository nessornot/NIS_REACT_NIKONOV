import React from 'react';
import type { FilterMode, ViewMode } from '../App.tsx';

interface ControlsProps {
	filterMode: FilterMode;
	onFilterChange: (mode: FilterMode) => void;
	viewMode: ViewMode;
	onViewModeChange: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ filterMode, onFilterChange, viewMode, onViewModeChange }) => {
	return (
		<>
			<button
				className='mr-5 h-7 w-10 rounded-sm hover:bg-gray-400 transition-colors delay-[25ms] active:bg-gray-500'
				onClick={() => onFilterChange('all')}
				disabled={filterMode === 'all'}
			>
				All
			</button>
			<button
				className='mr-5 h-7 w-22 rounded-sm hover:bg-gray-400 transition-colors delay-[25ms] active:bg-gray-500'
				onClick={() => onFilterChange('favorites')}
				disabled={filterMode === 'favorites'}
			>
				Favorites
			</button>
			<button
				className='h-7 px-2 rounded-sm hover:bg-gray-400 transition-colors delay-[25ms] active:bg-gray-500'
				onClick={onViewModeChange}
			>
				{viewMode === 'grid' ? 'Show as list' : 'Show as grid'}
			</button>
		</>
	);
};
