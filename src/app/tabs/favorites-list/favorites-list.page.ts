import { BehaviorSubject } from 'rxjs';
import { Component, inject } from '@angular/core';
import { PostsService } from 'src/app/shared/services/posts.service';
import { IPost } from 'src/app/shared/models/IPost';

@Component({
	selector: 'app-favorite-posts',
	templateUrl: './favorites-list.page.html',
	styleUrls: ['./favorites-list.page.scss'],
})
export class FavoritePostsList {
	private readonly postsService: PostsService = inject(PostsService);

	public readonly posts: BehaviorSubject<IPost[]> = this.postsService.favoritePostsSource;
}
