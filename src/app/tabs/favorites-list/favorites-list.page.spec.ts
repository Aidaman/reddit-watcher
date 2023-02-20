import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IPostsState } from 'src/app/store/posts/posts.reducer';
import { PostsComponent } from '../shared/posts-list/posts.component';

import { FavoritePostsList } from './favorites-list.page';

describe('FavoritesListComponent', () => {
	let component: FavoritePostsList;
	let fixture: ComponentFixture<FavoritePostsList>;
	let store: MockStore;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [PostsComponent],
			imports: [CommonModule],
			providers: [provideMockStore()],
		});

		store = TestBed.inject(MockStore);
		fixture = TestBed.createComponent(FavoritePostsList);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
