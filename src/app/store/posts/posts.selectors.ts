import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPostsState } from './posts.reducer';

export const postsFeatureSelector = createFeatureSelector<IPostsState>('posts');

export const postsSelector = createSelector(
	postsFeatureSelector,
	(postState: IPostsState) => postState.posts
);

export const postsIsLoadingSelector = createSelector(
	postsFeatureSelector,
	(postState: IPostsState) => postState.isLoading
);

export const postsHasValueSelector = createSelector(
	postsFeatureSelector,
	(postState: IPostsState) => postState.hasValue
);
