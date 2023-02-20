import { PostsService } from 'src/app/shared/services/posts.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/shared/models/IPost';
import { LocalStoragePostsCategory } from 'src/app/shared/local-storage-posts-category';

@Component({
	selector: 'app-post-item',
	templateUrl: './post-item.component.html',
	styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent {
	@Input() public post: IPost = {
		kind: 'StdVal',
		data: {
			id: 'StdVal',
			author: 'NoAuthor',
			subreddit_name_prefixed: 'r/empty-subreddit-value',
			title: 'StdTitle',
			score: 0,
			num_comments: 0,
			thumbnail: '',
			thumbnail_height: null,
			thumbnail_width: null,
		},
	};

	private readonly postsService: PostsService = inject(PostsService);

	public get isFavorite(): boolean {
		return this.postsService.isPostPresentInList(
			this.post.data.id,
			LocalStoragePostsCategory.favorites
		);
	}

	public get thumbnailIsAvailable(): boolean {
		const thumbnailHasDimensions: boolean =
			this.post.data.thumbnail_height !== null || this.post.data.thumbnail_width !== null;
		const thumbnailIsURL: boolean = this.post.data.thumbnail.includes('https://');

		return thumbnailHasDimensions && thumbnailIsURL;
	}
}
