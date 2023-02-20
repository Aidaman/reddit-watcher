import { IPostsState } from './../../store/posts/posts.reducer';
import { TestBed } from '@angular/core/testing';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PostsService } from './posts.service';

describe('LocalStorageService', () => {
	let service: PostsService;
	let store: MockStore;
	const initialState: IPostsState = {
		posts: [],
		isLoading: false,
		hasValue: false,
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideMockStore({ initialState })],
		});
		store = TestBed.inject(MockStore);
		service = TestBed.inject(PostsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
