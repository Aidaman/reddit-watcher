import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { IPost } from 'src/app/shared/models/IPost';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
	selector: 'app-post-item',
	templateUrl: './post-item.component.html',
	styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent {
	@Output() public postBanned: EventEmitter<IPost> = new EventEmitter();
	@Output() public postFavoritize: EventEmitter<IPost> = new EventEmitter();
	@Input() public post: IPost = {
		kind: 't3',
		data: {
			id: 'StdVal',
			name: 't3_StdVal',
			author: 'NoAuthor',
			subreddit_name_prefixed: 'r/empty-subreddit-value',
			title: 'StdTitle',
			score: 0,
			num_comments: 0,
			thumbnail: '',
			thumbnail_height: null,
			thumbnail_width: null,
		},
		isFavorite: false,
		removePost: false,
	};

	public get thumbnailIsAvailable(): boolean {
		const thumbnailHasDimensions: boolean =
			this.post.data.thumbnail_height !== null || this.post.data.thumbnail_width !== null;
		const thumbnailIsURL: boolean = this.post.data.thumbnail.includes('https://');

		return thumbnailHasDimensions && thumbnailIsURL;
	}

	public ban(post: IPost): void {
		this.postBanned.emit(post);
	}

	public favoritize(post: IPost): void {
		this.postFavoritize.emit(post);
	}

	public slide(event: any): void {
		const side = event.detail.side;
		if (side === 'start') {
			this.ban(this.post);
			return;
		}

		this.favoritize(this.post);
	}
}
