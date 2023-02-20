import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { SubredditService } from './subreddit.service';

describe('SubredditService', () => {
	let service: SubredditService;
	let store: MockStore;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideMockStore()],
		});
		service = TestBed.inject(SubredditService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
