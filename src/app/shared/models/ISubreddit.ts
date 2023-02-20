export interface ISubreddit {
	kind: string;
	data: {
		id: string;
		display_name_prefixed: string;
		icon_img: string; // <-- url for icon
	};
}
