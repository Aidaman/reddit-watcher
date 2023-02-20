import { ISubreddit } from 'src/app/shared/models/ISubreddit';
import { SubredditActions } from './../actions';
import { createAction, props } from '@ngrx/store';

export const searchSubredditAction = createAction(
	SubredditActions.SEARCH_SUBREDDIT,
	props<{ subredditName: string }>()
);

export const searchSubredditSuccessAction = createAction(
	SubredditActions.SEARCH_SUBREDDIT_SUCCESS,
	props<{ subreddits: ISubreddit[] }>()
);

export const searchSubredditFailureAction = createAction(SubredditActions.SEARCH_SUBREDDIT_FAILURE);

export const selectSubredditAction = createAction(
	SubredditActions.SELECT_SUBREDDIT,
	props<{ subreddit: ISubreddit }>()
);

export const unselectSubredditAction = createAction(SubredditActions.UNSELECT_SUBREDDIT);

export const resetSubredditsAction = createAction(SubredditActions.RESET_SUBREDDITS);
