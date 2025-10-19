export interface IMovie {
	id: number;
	title: string;
	year: number;
	posterUrl: string;
	isFavorite: boolean;
}

export const MOVIES_DATA: IMovie[] = [
	{
		id: 1,
		title: '1+1',
		year: 2011,
		posterUrl: 'https://cdn.pixabay.com/photo/2023/12/15/21/47/cat-8451431_640.jpg',
		isFavorite: false,
	},
	{
		id: 2,
		title: 'Интерстеллар',
		year: 2014,
		posterUrl: 'https://cdn.pixabay.com/photo/2023/12/15/21/47/cat-8451431_640.jpg',
		isFavorite: false,
	},
	{
		id: 3,
		title: 'Побег из Шоушенка',
		year: 1994,
		posterUrl: 'https://cdn.pixabay.com/photo/2023/12/15/21/47/cat-8451431_640.jpg',
		isFavorite: false,
	},
]