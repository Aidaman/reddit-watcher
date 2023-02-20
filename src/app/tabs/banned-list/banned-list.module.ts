import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BannedPostsListRoutingModule } from './banned-list-routing.module';
import { BannedPostsList } from './banned-list.page';
import { TabsSharedModule } from '../shared/tabs-shared.module';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		BannedPostsListRoutingModule,
		TabsSharedModule,
	],
	declarations: [BannedPostsList],
})
export class BannedPostsListModule {}
