export interface IMovie {
	id: string;
	title: string;
	year: string;
	posterUrl: string;
	isFavorite: boolean;
}

interface IOmdbMovie {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
}

interface IOmdbSuccessResponse {
	Search: IOmdbMovie[];
	totalResults: string;
	Response: "True";
}

interface IOmdbErrorResponse {
	Error: string;
	Response: "False";
}

export type TOmdbResponse = IOmdbSuccessResponse | IOmdbErrorResponse;
