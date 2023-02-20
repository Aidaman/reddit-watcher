import { resetSubredditsAction } from './../../store/subreddits/subreddit.actions';
import {
	selectSubredditAction,
	unselectSubredditAction,
} from 'src/app/store/subreddits/subreddit.actions';
import { fetchPostsAction } from '../../store/posts/posts.actions';
import { Component, inject, OnInit } from '@angular/core';
import { Observable, tap, map, BehaviorSubject } from 'rxjs';
import { IPost } from 'src/app/shared/models/IPost';
import { Store } from '@ngrx/store';
import { ISubreddit } from 'src/app/shared/models/ISubreddit';
import { postsIsLoadingSelector, postsSelector } from 'src/app/store/posts/posts.selectors';
import { SubredditService } from 'src/app/shared/services/subreddit.service';

@Component({
	selector: 'app-posts-list',
	templateUrl: './posts-list.page.html',
	styleUrls: ['./posts-list.page.scss'],
})
export class SimplePostsList implements OnInit {
	private readonly store: Store = inject(Store);
	private readonly subredditService: SubredditService = inject(SubredditService);

	public posts$: Observable<IPost[]> = this.store.select(postsSelector);
	public isPostsLoading$: Observable<boolean> = this.store.select(postsIsLoadingSelector);

	public subredditName: BehaviorSubject<string> = this.subredditService.subredditName;

	public ngOnInit(): void {
		this.resetPosts();
	}

	public onSelectedSubreddit(subreddit: ISubreddit | 'random') {
		this.store.dispatch(resetSubredditsAction());

		if (subreddit === 'random') {
			this.store.dispatch(fetchPostsAction({ subredditName: 'random', isRandom: true }));
			return;
		}

		const subredditName = subreddit.data.display_name_prefixed;
		this.store.dispatch(selectSubredditAction({ subreddit }));

		if (subreddit.kind === 'NONE') {
			this.resetPosts();
			return;
		}

		this.subredditService.subredditName.next(subredditName.slice(2));
		this.store.dispatch(fetchPostsAction({ subredditName }));
	}

	public resetPosts(): void {
		this.subredditService.subredditName.next('');
		this.store.dispatch(fetchPostsAction({ subredditName: null }));
		// this.store.dispatch(unselectSubredditAction());
	}
}
