import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimplePostsList } from './posts-list.page';

const routes: Routes = [
	{
		path: '',
		component: SimplePostsList,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SimplePostsListRoutingModule {}
