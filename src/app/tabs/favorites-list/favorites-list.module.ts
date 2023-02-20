import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritePostsListRoutingModule } from './favorites-list-routing.module';
import { FormsModule } from '@angular/forms';
import { FavoritePostsList } from './favorites-list.page';
import { TabsSharedModule } from '../shared/tabs-shared.module';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		FavoritePostsListRoutingModule,
		TabsSharedModule,
	],
	declarations: [FavoritePostsList],
})
export class FavoritePostsListPageModule {}
