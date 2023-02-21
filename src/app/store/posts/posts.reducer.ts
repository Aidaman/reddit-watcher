import { IPost } from 'src/app/shared/models/IPost';
import { createReducer } from '@ngrx/store';
import { on } from '@ngrx/store';
import {
	fetchPostsAction,
	fetchPostsSuccessAction,
	fetchPostsFailureAction,
	addPostAction,
	removePostAction,
	fetchMorePostsAction,
	fetchMorePostsFailureAction,
	fetchMorePostsSuccessAction,
	toggleIsPostFavoriteAction,
} from './posts.actions';

export interface IPostsState {
	posts: IPost[];
	isLoading: boolean;
	isLoadingMore: boolean;
	hasValue: boolean;
}

const initialState: IPostsState = {
	posts: [],
	isLoading: false,
	isLoadingMore: false,
	hasValue: false,
};

const addPost = (post: IPost, list: IPost[]): IPost[] => {
	const res: IPost[] = [...list];
	res.push(post);
	return res;
};

const addPosts = (posts: IPost[], list: IPost[]): IPost[] => {
	if (posts[0].data.id === list[0].data.id) return list;

	const res: IPost[] = [...list];
	res.push(...posts);
	return res;
};

const removePost = (post: IPost, list: IPost[]): IPost[] =>
	[...list].filter(p => p.data.id !== post.data.id);

const toggleIsPostFavorite = (postId: string, list: IPost[]): IPost[] =>
	[...list].map(post =>
		post.data.id === postId ? ({ ...post, isFavorite: !post.isFavorite } as IPost) : post
	);

export const postsReducer = createReducer(
	initialState,

	on(fetchPostsAction, (state, action) => ({
		...state,
		isLoading: true,
	})),

	on(fetchPostsSuccessAction, (state, action) => ({
		...state,
		posts: action.posts,
		isLoading: false,
		hasValue: true,
	})),

	on(fetchPostsFailureAction, (state, action) => ({
		...state,
		isLoading: false,
		hasValue: false,
	})),

	on(fetchMorePostsAction, (state, action) => ({
		...state,
		isLoadingMore: true,
	})),

	on(fetchMorePostsSuccessAction, (state, action) => ({
		...state,
		posts: addPosts(action.posts, state.posts),
		isLoadingMore: false,
	})),

	on(fetchMorePostsFailureAction, (state, action) => ({
		...state,
		isLoadingMore: false,
	})),

	on(addPostAction, (state, action) => ({
		...state,
		posts: addPost(action.post, state.posts),
	})),

	on(removePostAction, (state, action) => ({
		...state,
		posts: removePost(action.post, state.posts),
	})),

	on(toggleIsPostFavoriteAction, (state, action) => ({
		...state,
		posts: toggleIsPostFavorite(action.postId, state.posts),
	}))
);
