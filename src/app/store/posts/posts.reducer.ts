import { IPost } from 'src/app/shared/models/IPost';
import { createReducer } from '@ngrx/store';
import { on } from '@ngrx/store';
import {
	fetchPostsAction,
	fetchPostsSuccessAction,
	fetchPostsFailureAction,
	addPostAction,
	removePostAction,
} from './posts.actions';

export interface IPostsState {
	posts: IPost[];
	isLoading: boolean;
	hasValue: boolean;
}

const initialState: IPostsState = {
	posts: [],
	isLoading: false,
	hasValue: false,
};

const addPost = (post: IPost, list: IPost[]): IPost[] => {
	const res: IPost[] = [...list];
	res.push(post);
	return res;
};

const removePost = (post: IPost, list: IPost[]): IPost[] =>
	[...list].filter(p => p.data.id !== post.data.id);

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

	on(addPostAction, (state, action) => ({
		...state,
		posts: addPost(action.post, state.posts),
	})),

	on(removePostAction, (state, action) => ({
		...state,
		posts: removePost(action.post, state.posts),
	}))
);
