import { toggleIsPostFavoriteAction } from './../../../store/posts/posts.actions';
import { Observable } from 'rxjs';
import { postsIsLoadingMoreSelector } from './../../../store/posts/posts.selectors';
import { removePostAction } from '../../../store/posts/posts.actions';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalStoragePostsCategory } from 'src/app/shared/local-storage-posts-category';
import { IPost } from 'src/app/shared/models/IPost';
import { PostsService } from 'src/app/shared/services/posts.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.scss'],
	animations: [
		trigger('post-remove', [
			state('open', style({})),
			transition(':leave', [animate(300, style({ transform: 'translateX(100%' }))]),
		]),
	],
})
export class PostsComponent {
	@Input() public posts: IPost[] | null = [];

	private readonly postsService: PostsService = inject(PostsService);
	private readonly store: Store = inject(Store);

	public isLoadingMorePosts$: Observable<boolean> = this.store.select(postsIsLoadingMoreSelector);

	public onPostFavoritize(post: IPost): void {
		const favorites: LocalStoragePostsCategory = LocalStoragePostsCategory.favorites;
		const isPostFavorite: boolean = this.postsService.isPostPresentInList(
			post.data.id,
			favorites
		);

		this.store.dispatch(toggleIsPostFavoriteAction({ postId: post.data.id }));

		if (!isPostFavorite) {
			this.postsService.addPost(favorites, post);
			return;
		}

		this.postsService.removePost(favorites, post);

		const banned: LocalStoragePostsCategory = LocalStoragePostsCategory.banned;
		const isPostBanned: boolean = this.postsService.isPostPresentInList(post.data.id, banned);

		if (isPostBanned) this.postsService.removePost(banned, post);
	}

	public onPostBanned(post: IPost): void {
		const category: LocalStoragePostsCategory = LocalStoragePostsCategory.banned;
		const isPostInList: boolean = this.postsService.isPostPresentInList(post.data.id, category);
		this.store.dispatch(removePostAction({ post }));

		if (!isPostInList) {
			this.postsService.addPost(category, post);
			return;
		}

		this.postsService.removePost(category, post, isPostInList);
	}
}
