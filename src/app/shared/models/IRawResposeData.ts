import { IPost } from './IPost';
import { ISubreddit } from './ISubreddit';

export interface IRawResponseData {
	kind: string;
	data: {
		after: string;
		dist: number;
		modhash: string;
		geo_filter: unknown;
		children: IPost[] | ISubreddit[];
		before: unknown;
	};
}
