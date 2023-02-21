export interface IPost {
	kind: string;
	data: {
		id: string;
		name: string;
		author: string; // <-- author name
		subreddit_name_prefixed: string; // <-- subreddit name in format "r/NAME"
		title: string;
		score: number;
		num_comments: number;
		thumbnail: string; // <-- thumbnail url
		thumbnail_height: number | null;
		thumbnail_width: number | null;
	};
	isFavorite: boolean;
	removePost: boolean;
}
