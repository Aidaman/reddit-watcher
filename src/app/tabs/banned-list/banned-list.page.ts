import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPost } from 'src/app/shared/models/IPost';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
	selector: 'app-banned-posts',
	templateUrl: 'banned-list.page.html',
	styleUrls: ['banned-list.page.scss'],
})
export class BannedPostsList {
	private readonly postsService: PostsService = inject(PostsService);

	public readonly posts: BehaviorSubject<IPost[]> = this.postsService.bannedPostsSource;
}
