import { ISubreddit } from 'src/app/shared/models/ISubreddit';
import {
	searchSubredditAction,
	searchSubredditSuccessAction,
	searchSubredditFailureAction,
} from './subreddit.actions';
import { HttpService } from 'src/app/shared/services/http.service';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, of } from 'rxjs';

@Injectable()
export class SubredditEffect {
	private readonly httpService: HttpService = inject(HttpService);
	private readonly actions$: Actions = inject(Actions);

	public searchSubreddits$ = createEffect(() =>
		this.actions$.pipe(
			ofType(searchSubredditAction),
			switchMap(({ subredditName }) => this.subredditQuery(subredditName))
		)
	);

	private subredditQuery(subredditName: string) {
		return this.httpService.getSubredditsByString(subredditName).pipe(
			map((subreddits: ISubreddit[]) => searchSubredditSuccessAction({ subreddits })),
			catchError(() => of(searchSubredditFailureAction))
		);
	}
}
