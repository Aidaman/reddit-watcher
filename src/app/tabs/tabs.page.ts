import { SubredditService } from 'src/app/shared/services/subreddit.service';
import { fetchPostsAction } from '../store/posts/posts.actions';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-tabs',
	templateUrl: 'tabs.page.html',
	styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
	private readonly store: Store = inject(Store);
	private readonly subredditService: SubredditService = inject(SubredditService);

	public fetchPosts(): void {
		const subredditName: string = 'r/' + this.subredditService.subredditName.getValue().name;
		const isRandom: boolean | undefined =
			this.subredditService.subredditName.getValue().isRandom;

		if (isRandom) {
			this.store.dispatch(fetchPostsAction({ subredditName: null }));
			this.subredditService.subredditName.next({ name: '', isRandom: false });
			return;
		}
		if (subredditName && subredditName !== 'r/') {
			this.store.dispatch(fetchPostsAction({ subredditName }));
			return;
		}

		this.store.dispatch(fetchPostsAction({ subredditName: null }));
	}
}
