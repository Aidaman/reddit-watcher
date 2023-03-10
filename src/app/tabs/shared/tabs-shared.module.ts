import { LoaderComponent } from './loader/loader.component';
import { PostItemComponent } from './posts-list/post-item/post-item.component';
import { PostsComponent } from './posts-list/posts.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ScrollTrackDirective } from './scroll/scroll-track.directive';

@NgModule({
	declarations: [PostsComponent, PostItemComponent, LoaderComponent, ScrollTrackDirective],
	exports: [PostsComponent, PostItemComponent, LoaderComponent],
	imports: [CommonModule, IonicModule],
})
export class TabsSharedModule {}
