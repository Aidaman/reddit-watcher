import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: 'tabs',
		component: TabsPage,
		children: [
			{
				path: 'watch',
				loadChildren: () =>
					import('./posts-list/posts-list.module').then(m => m.SimplePostsListModule),
			},
			{
				path: 'banned',
				loadChildren: () =>
					import('./banned-list/banned-list.module').then(m => m.BannedPostsListModule),
			},
			{
				path: 'favorite',
				loadChildren: () =>
					import('./favorites-list/favorites-list.module').then(
						m => m.FavoritePostsListPageModule
					),
			},
			{
				path: '',
				redirectTo: '/tabs/tab1',
				pathMatch: 'full',
			},
		],
	},
	{
		path: '',
		redirectTo: '/tabs/watch',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
