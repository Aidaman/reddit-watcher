import { searchSubredditAction } from './../../../store/subreddits/subreddit.actions';
import { ISubreddit } from './../../../shared/models/ISubreddit';
import { Component, EventEmitter, inject, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, tap, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
	subredditIsLoadingSelector,
	subredditsSelector,
} from 'src/app/store/subreddits/subreddit.selectors';
import { SubredditService } from 'src/app/shared/services/subreddit.service';

@Component({
	selector: 'app-searchbar',
	templateUrl: './searchbar.component.html',
	styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnDestroy {
	@Output() public subredditSelected: EventEmitter<ISubreddit> = new EventEmitter();
	@Output() public randomSubredditSelected: EventEmitter<void> = new EventEmitter();

	private readonly formBuilder: FormBuilder = inject(FormBuilder);
	private readonly store: Store = inject(Store);
	private readonly subredditService: SubredditService = inject(SubredditService);
	// private readonly httpService: HttpService = inject(HttpService);

	private readonly emptySubreddit: ISubreddit = {
		kind: 'NONE',
		data: {
			id: 'NONE',
			display_name_prefixed: '',
			icon_img: 'NONE',
		},
	};

	public curentSubredditName$: Observable<{ name: string; isRandom?: boolean }> =
		this.subredditService.subredditName.asObservable();

	public isSubredditLoading$: Observable<boolean> = this.store.select(subredditIsLoadingSelector);

	public form: FormGroup = this.formBuilder.group({
		subredditName: [null],
	});

	public subreddits$: Observable<ISubreddit[]> = this.store.select(subredditsSelector);

	public formChanges: Subscription = this.form.valueChanges
		.pipe(tap(({ subredditName }) => this.fetchSubreddits(subredditName)))
		.subscribe();

	private fetchSubreddits(subredditName: string): void {
		if (subredditName === '' || subredditName === null) {
			this.selectSubreddit(this.emptySubreddit);
		}

		if (subredditName !== '') this.store.dispatch(searchSubredditAction({ subredditName }));
		// this.subreddits = await lastValueFrom(
		// 	this.httpService.getSubredditsByString(subredditName)
		// );
	}

	public ngOnDestroy(): void {
		this.formChanges.unsubscribe();
	}

	public selectSubreddit(subreddit: ISubreddit): void {
		this.subredditSelected.emit(subreddit);
		const name: string = subreddit.data.display_name_prefixed.slice(2);
		this.subredditService.subredditName.next({ name });
	}

	public returnHome() {
		this.selectSubreddit(this.emptySubreddit);
	}

	public randomSubreddit(): void {
		this.randomSubredditSelected.emit();
	}
}
