import { fetchMorePostsAction } from '../../../store/posts/posts.actions';
import { PostsService } from '../../../shared/services/posts.service';
import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubredditService } from 'src/app/shared/services/subreddit.service';

@Directive({
	selector: '[appScrollTrack]',
})
export class ScrollTrackDirective {
	private readonly el: ElementRef = inject(ElementRef);
	private readonly store: Store = inject(Store);
	private readonly postsService: PostsService = inject(PostsService);
	private readonly subredditService: SubredditService = inject(SubredditService);

	private scrollHeight: number = 0;
	private scrollTop: number = 0;
	private isEmitted: boolean = false;

	private emit(eventScrollTop: number) {
		const scrollTopIsEnougToFireEvent: boolean =
			eventScrollTop > this.scrollHeight - 50 || this.scrollHeight <= 0;

		if (scrollTopIsEnougToFireEvent && !this.isEmitted) {
			this.scrollHeight = this.el.nativeElement.scrollHeight;

			let subredditName: string | null = this.subredditService.subredditName.getValue();
			subredditName = subredditName === '' ? null : subredditName;

			const lastPostName: string = this.postsService.lastPostName.getValue();
			const limit: number = 50;
			this.store.dispatch(fetchMorePostsAction({ lastPostName, limit, subredditName }));

			this.isEmitted = true;
		}
		if (this.scrollHeight !== this.el.nativeElement.scrollHeight) {
			this.isEmitted = false;
		}
	}

	@HostListener('scroll', ['$event'])
	public scrollIt() {
		//@ts-ignore
		this.emit(event?.target.scrollTop);
	}
}
