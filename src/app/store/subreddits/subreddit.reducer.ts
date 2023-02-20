import {
	searchSubredditAction,
	searchSubredditSuccessAction,
	searchSubredditFailureAction,
	selectSubredditAction,
	resetSubredditsAction,
	unselectSubredditAction,
} from './subreddit.actions';
import { ISubreddit } from 'src/app/shared/models/ISubreddit';
import { createReducer, on } from '@ngrx/store';

export interface ISubredditState {
	subreddits: ISubreddit[];
	selectedSubreddit: ISubreddit | null;
	isLoading: boolean;
	hasValue: boolean;
}

const initialState: ISubredditState = {
	subreddits: [],
	selectedSubreddit: null,
	isLoading: false,
	hasValue: false,
};

export const subredditReducer = createReducer(
	initialState,

	on(searchSubredditAction, (state, action) => ({
		...state,
		isLoading: true,
	})),

	on(searchSubredditSuccessAction, (state, action) => ({
		...state,
		isLoading: false,
		hasValue: true,
		subreddits: action.subreddits,
	})),

	on(searchSubredditFailureAction, (state, action) => ({
		...state,
		isLoading: false,
		hasValue: false,
		subreddits: [],
	})),

	on(selectSubredditAction, (state, action) => ({
		...state,
		selectedSubreddit: action.subreddit,
	})),

	on(unselectSubredditAction, (state, action) => ({
		...state,
		selectedSubreddit: null,
		isLoading: false,
		hasValue: false,
	})),

	on(resetSubredditsAction, (state, action) => ({
		...state,
		subreddits: [],
	}))
);
