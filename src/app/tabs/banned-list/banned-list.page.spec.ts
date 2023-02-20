import { CommonModule } from '@angular/common';
import { PostsComponent } from './../shared/posts-list/posts.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IPostsState } from 'src/app/store/posts/posts.reducer';

import { BannedPostsList } from './banned-list.page';

describe('BannedPostsList', () => {
	let component: BannedPostsList;
	let fixture: ComponentFixture<BannedPostsList>;
	let store: MockStore;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [PostsComponent],
			imports: [CommonModule],
			providers: [provideMockStore()],
		});

		store = TestBed.inject(MockStore);
		fixture = TestBed.createComponent(BannedPostsList);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
