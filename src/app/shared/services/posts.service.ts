import { toggleIsPostFavoriteAction } from './../../store/posts/posts.actions';
import { addPostAction } from '../../store/posts/posts.actions';
import { IPost } from '../models/IPost';
import { inject, Injectable } from '@angular/core';
import { LocalStoragePostsCategory } from '../local-storage-posts-category';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';

enum PostBanAction {
	favoritize,
	ban,
	unban,
}

@Injectable({
	providedIn: 'root',
})
export class PostsService {
	private readonly store: Store = inject(Store);

	public lastPostName: BehaviorSubject<string> = new BehaviorSubject<string>('');

	public favoritePostsSource: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>(
		this.getPostsByCategory(LocalStoragePostsCategory.favorites)
	);

	public bannedPostsSource: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>(
		this.getPostsByCategory(LocalStoragePostsCategory.banned)
	);

	private getPostsByCategory(category: LocalStoragePostsCategory): IPost[] {
		const items: string | null = localStorage.getItem(category);
		return (items ? JSON.parse(items) : []) as IPost[];
	}

	private updateLocalStorage(category: LocalStoragePostsCategory, value: IPost[]): void {
		localStorage.setItem(category, JSON.stringify(value));

		if (category === LocalStoragePostsCategory.favorites) this.favoritePostsSource.next(value);

		if (category === LocalStoragePostsCategory.banned) this.bannedPostsSource.next(value);
	}

	private togglePostCategory(post: IPost, action: PostBanAction, isFavorite?: boolean): void {
		switch (action) {
			case PostBanAction.favoritize:
				this.removePost(LocalStoragePostsCategory.banned, post);
				this.store.dispatch(
					toggleIsPostFavoriteAction({ postId: post.data.id, isFavorite: true })
				);
				break;
			case PostBanAction.ban:
				this.removePost(LocalStoragePostsCategory.favorites, post);
				this.store.dispatch(
					toggleIsPostFavoriteAction({ postId: post.data.id, isFavorite: false })
				);
				break;
			case PostBanAction.unban:
				this.removePost(LocalStoragePostsCategory.favorites, post, true);
				this.removePost(LocalStoragePostsCategory.banned, post);
				this.store.dispatch(addPostAction({ post }));
				this.store.dispatch(
					toggleIsPostFavoriteAction({ postId: post.data.id, isFavorite })
				);
				break;
			default:
				break;
		}
	}

	private excludeBannedPosts(originalPosts: IPost[]): IPost[] {
		const bannedPosts: IPost[] = this.bannedPostsSource.getValue();
		return originalPosts.filter(
			(post: IPost) => !bannedPosts.some(p => p.data.id === post.data.id)
		);
	}

	private defineFavoritePosts(originalPosts: IPost[]): IPost[] {
		const favoritePosts: IPost[] = this.favoritePostsSource.getValue();
		return originalPosts.map(post => {
			const isFavorite = favoritePosts.findIndex(p => p.data.id === post.data.id) !== -1;
			return { ...post, isFavorite: isFavorite } as IPost;
		});
	}

	public mapPosts(originalPosts: IPost[]): IPost[] {
		return this.defineFavoritePosts(this.excludeBannedPosts(originalPosts));
	}

	public isPostPresentInList(postId: string, list: IPost[] | LocalStoragePostsCategory): boolean {
		list = Array.isArray(list) ? list : this.getPostsByCategory(list);
		return !!list.find(p => p.data.id === postId);
	}

	public addPost(category: LocalStoragePostsCategory, value: IPost): void {
		const posts: IPost[] = this.getPostsByCategory(category);
		const postBanAction: PostBanAction =
			category === LocalStoragePostsCategory.favorites
				? PostBanAction.favoritize
				: PostBanAction.ban;

		this.togglePostCategory(value, postBanAction);

		if (!this.isPostPresentInList(value.data.id, posts)) {
			posts.push(value);
		}

		this.updateLocalStorage(category, posts);
	}

	public removePost(category: LocalStoragePostsCategory, post: IPost, isUnban?: boolean): void {
		const posts: IPost[] = this.getPostsByCategory(category);
		const postIsPresentInList: boolean = this.isPostPresentInList(post.data.id, posts);

		if (postIsPresentInList) {
			const newPosts: IPost[] = posts.filter(fav => fav.data.id !== post.data.id);
			this.updateLocalStorage(category, newPosts);
		}

		if (postIsPresentInList && isUnban)
			this.togglePostCategory(post, PostBanAction.unban, isUnban);
	}
}
