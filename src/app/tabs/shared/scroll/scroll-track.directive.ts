import { fetchMorePostsAction } from '../../../store/posts/posts.actions';
import { PostsService } from '../../../shared/services/posts.service';
import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubredditService } from 'src/app/shared/services/subreddit.service';
import { BehaviorSubject } from 'rxjs';

@Directive({
	selector: '[appScrollTrack]',
})
export class ScrollTrackDirective {
	private readonly el: ElementRef = inject(ElementRef);
	private readonly store: Store = inject(Store);
	private readonly postsService: PostsService = inject(PostsService);
	private readonly subredditService: SubredditService = inject(SubredditService);

	private scrollHeight: number = 0;
	private isEmitted: boolean = false;

	private emit(eventScrollTop: number) {
		if (this.scrollHeight <= 0) this.scrollHeight = this.el.nativeElement.scrollHeight;

		const scrollTopIsEnougToFireEvent: boolean = this.scrollHeight - eventScrollTop < 650;

		if (scrollTopIsEnougToFireEvent && !this.isEmitted) {
			console.log(this.scrollHeight, eventScrollTop, this.scrollHeight - eventScrollTop);
			this.scrollHeight = this.el.nativeElement.scrollHeight;

			const subredditName: string | null = this.assignSubredditName(
				this.subredditService.subredditName
			);

			const lastPostName: string = this.postsService.lastPostName.getValue();

			const limit: number = 25;
			this.store.dispatch(fetchMorePostsAction({ lastPostName, limit, subredditName }));

			this.isEmitted = true;
		}
		if (this.scrollHeight !== this.el.nativeElement.scrollHeight) {
			this.isEmitted = false;
		}
	}

	private assignSubredditName(subject: BehaviorSubject<{ name: string; isRandom?: boolean }>) {
		return subject.getValue().name === '' ? null : subject.getValue().name;
	}

	@HostListener('scroll', ['$event'])
	public scrollIt() {
		//@ts-ignore
		this.emit(event?.target.scrollTop);
	}
}
