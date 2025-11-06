import React, { forwardRef } from 'react';

interface SearchBarProps {
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
	({ onSubmit }, ref) => {

		return (
			<form onSubmit={onSubmit}>
				<input
					className='h-7 w-45 rounded-sm hover:bg-gray-400 transition-colors delay-[25ms] focus:bg-gray-400'
					type='text'
					placeholder='Start typing...'
					ref={ref}
				/>
			</form>
		);
	}
);
