export enum PostsActions {
	FETCH_POSTS = '[posts] fetch posts',
	FETCH_POSTS_SUCCESS = '[posts] fetch posts success',
	FETCH_POSTS_FAILURE = '[posts] fetch posts failure',

	FETCH_MORE_POSTS = '[posts] fetch more posts',
	FETCH_MORE_POSTS_SUCCESS = '[posts] fetch more posts success',
	FETCH_MORE_POSTS_FAILURE = '[posts] fetch more posts failure',

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
