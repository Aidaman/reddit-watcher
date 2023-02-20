import { ISubredditState } from './subreddit.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const subredditFeatureSelector = createFeatureSelector<ISubredditState>('subreddit');

export const selectedSubredditSelector = createSelector(
	subredditFeatureSelector,
	(subredditState: ISubredditState) => subredditState.selectedSubreddit
);

export const subredditsSelector = createSelector(
	subredditFeatureSelector,
	(subredditState: ISubredditState) => subredditState.subreddits
);

export const subredditIsLoadingSelector = createSelector(
	subredditFeatureSelector,
	(subredditState: ISubredditState) => subredditState.isLoading
);

export const subredditHasValueSelector = createSelector(
	subredditFeatureSelector,
	(subredditState: ISubredditState) => subredditState.hasValue
);
