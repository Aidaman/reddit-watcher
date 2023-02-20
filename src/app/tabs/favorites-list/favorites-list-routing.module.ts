import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritePostsList } from './favorites-list.page';

const routes: Routes = [
	{
		path: '',
		component: FavoritePostsList,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class FavoritePostsListRoutingModule {}
