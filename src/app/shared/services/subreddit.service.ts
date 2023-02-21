import { searchSubredditAction } from './../../store/subreddits/subreddit.actions';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SubredditService {
	private readonly store: Store = inject(Store);

	public subredditName: BehaviorSubject<{ name: string; isRandom?: boolean }> =
		new BehaviorSubject<{ name: string; isRandom?: boolean }>({ name: '' });

	public searchSubredditQuerry(subredditName: string) {
		this.subredditName.next({ name: '' });
		this.store.dispatch(searchSubredditAction({ subredditName }));
	}
}
