import { PostsService } from 'src/app/shared/services/posts.service';
import { IPost } from 'src/app/shared/models/IPost';
import { Pipe, PipeTransform, inject } from '@angular/core';
import { LocalStoragePostsCategory } from 'src/app/shared/local-storage-posts-category';

@Pipe({
	name: 'isFavorite',
})
export class IsFavoritePipe implements PipeTransform {
	private readonly postsService: PostsService = inject(PostsService);

	public transform(post: IPost, ...args: unknown[]): unknown {
		return this.postsService.isPostPresentInList(
			post.data.id,
			LocalStoragePostsCategory.favorites
		);
	}
}
