import { searchSubredditAction } from './../../store/subreddits/subreddit.actions';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SubredditService {
	private readonly store: Store = inject(Store);

	public subredditName: BehaviorSubject<string> = new BehaviorSubject<string>('');

	public searchSubredditQuerry(subredditName: string) {
		this.subredditName.next(subredditName);
		this.store.dispatch(searchSubredditAction({ subredditName }));
	}
}
