import { PostsService } from 'src/app/shared/services/posts.service';
import {
	fetchPostsAction,
	fetchPostsSuccessAction,
	fetchPostsFailureAction,
	fetchMorePostsAction,
	fetchMorePostsSuccessAction,
	fetchMorePostsFailureAction,
} from './posts.actions';
import { createEffect } from '@ngrx/effects';
import { Actions, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { switchMap, Observable, map, catchError, of } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { IPost } from 'src/app/shared/models/IPost';

@Injectable()
export class PostsEffect {
	private readonly actions$: Actions = inject(Actions);
	private readonly httpService: HttpService = inject(HttpService);
	private readonly postsService: PostsService = inject(PostsService);

	public fetchPosts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchPostsAction),
			switchMap(({ subredditName, isRandom }) =>
				this.defineHttpQuerry(subredditName, isRandom)
			)
		)
	);

	public fetchMorePosts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchMorePostsAction),
			switchMap(({ subredditName, lastPostName, limit }) =>
				this.defineMorePostsQuerry(subredditName, lastPostName, limit)
			)
		)
	);

	private defineMorePostsQuerry(
		subredditName: string | null,
		lastPostName: string,
		limit: number
	) {
		console.log(subredditName);

		const querry: Observable<IPost[]> = !subredditName
			? this.httpService.getMoreHomepagePosts(lastPostName, limit)
			: this.httpService.getMoreSubredditPosts('r/' + subredditName, lastPostName, limit);

		return this.decorateMoreQuerry(querry);
	}

	private defineHttpQuerry(subredditName: string | null, isRandom?: boolean) {
		if (isRandom) return this.decorateQuerry(this.httpService.getRandomSubredditPosts());

		const querry: Observable<IPost[]> = !subredditName
			? this.httpService.getHomepagePosts()
			: this.httpService.getSubredditPosts(subredditName);

		return this.decorateQuerry(querry);
	}

	private decorateQuerry(querry: Observable<IPost[]>) {
		return querry.pipe(
			map((value: IPost[]) => this.postsService.excludeBannedPosts(value)),
			map(posts => fetchPostsSuccessAction({ posts })),
			catchError(() => of(fetchPostsFailureAction))
		);
	}

	private decorateMoreQuerry(querry: Observable<IPost[]>) {
		return querry.pipe(
			map((value: IPost[]) => this.postsService.excludeBannedPosts(value)),
			map(posts => fetchMorePostsSuccessAction({ posts })),
			catchError(() => of(fetchMorePostsFailureAction))
		);
	}
}
