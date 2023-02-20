import { IPost } from '../../shared/models/IPost';
import { createAction, props } from '@ngrx/store';
import { PostsActions } from '../actions';

export const fetchPostsAction = createAction(
	PostsActions.FETCH_POSTS,
	props<{ subredditName: string | null; isRandom?: boolean }>()
);

export const fetchPostsSuccessAction = createAction(
	PostsActions.FETCH_POSTS_SUCCESS,
	props<{ posts: IPost[] }>()
);

export const fetchPostsFailureAction = createAction(PostsActions.FETCH_POSTS_FAILURE);

export const addPostAction = createAction(PostsActions.ADD_POST, props<{ post: IPost }>());

export const removePostAction = createAction(PostsActions.REMOVE_POST, props<{ post: IPost }>());
