export enum PostsActions {
	FETCH_POSTS = '[posts] fetch',
	FETCH_POSTS_SUCCESS = '[posts] fetch success',
	FETCH_POSTS_FAILURE = '[posts] fetch failure',

	ADD_POST = '[posts] add post',
	REMOVE_POST = '[posts] add post',
}

export enum SubredditActions {
	SEARCH_SUBREDDIT = '[subreddit] search',
	SEARCH_SUBREDDIT_SUCCESS = '[subreddit] search success',
	SEARCH_SUBREDDIT_FAILURE = '[subreddit] search failure',

	SELECT_SUBREDDIT = '[subreddit] select',
	UNSELECT_SUBREDDIT = '[subreddit] unselect',
	RESET_SUBREDDITS = '[subreddit] reset subreddit list',
}
