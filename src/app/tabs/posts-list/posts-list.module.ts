import { SubredditItemComponent } from './searchbar/subreddit-item/subreddit-item.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { TabsSharedModule } from './../shared/tabs-shared.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimplePostsList } from './posts-list.page';

import { SimplePostsListRoutingModule } from './posts-list-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SimplePostsListRoutingModule,
		TabsSharedModule,
	],
	declarations: [SimplePostsList, SearchbarComponent, SubredditItemComponent],
})
export class SimplePostsListModule {}
