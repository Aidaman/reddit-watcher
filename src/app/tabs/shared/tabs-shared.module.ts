import { LoaderComponent } from './loader/loader.component';
import { PostItemComponent } from './posts-list/post-item/post-item.component';
import { PostsComponent } from './posts-list/posts.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IsFavoritePipe } from './is-favorite/is-favorite.pipe';

@NgModule({
	declarations: [PostsComponent, PostItemComponent, LoaderComponent, IsFavoritePipe],
	exports: [PostsComponent, PostItemComponent, LoaderComponent],
	imports: [CommonModule, IonicModule],
})
export class TabsSharedModule {}
