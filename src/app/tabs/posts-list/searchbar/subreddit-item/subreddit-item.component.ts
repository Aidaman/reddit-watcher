import { ISubreddit } from 'src/app/shared/models/ISubreddit';
import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-subreddit-item',
	templateUrl: './subreddit-item.component.html',
	styleUrls: ['./subreddit-item.component.scss'],
})
export class SubredditItemComponent {
	@Input() public subreddit: ISubreddit = {
		kind: 'StdVal',
		data: {
			id: 'StdVal_data_id',
			display_name_prefixed: 'r/std-val_data_name',
			icon_img: 'none',
		},
	};

	public get iconThumbIsAvailable() {
		const thumbnailIsURL: boolean = this.subreddit.data.icon_img.includes('https://');
		return thumbnailIsURL;
	}
}
