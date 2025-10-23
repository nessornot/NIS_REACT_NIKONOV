import React, { useRef } from 'react';

interface SearchBarProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, onSubmit }) => {
	const searchInputRef = useRef<HTMLInputElement>(null);

	return (
		<form onSubmit={onSubmit}>
			<input
				className='h-7 w-45 rounded-sm hover:bg-gray-400 transition-colors delay-[25ms] focus:bg-gray-400'
				type='text'
				placeholder='Start typing...'
				ref={searchInputRef}
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
		</form>
	);
};