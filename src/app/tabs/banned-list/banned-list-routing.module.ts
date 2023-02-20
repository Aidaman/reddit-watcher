import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BannedPostsList } from './banned-list.page';

const routes: Routes = [
	{
		path: '',
		component: BannedPostsList,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BannedPostsListRoutingModule {}
