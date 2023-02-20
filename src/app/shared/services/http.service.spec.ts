import { IPost } from 'src/app/shared/models/IPost';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { IRawResponseData } from '../models/IRawResposeData';

describe('HttpServiceService', () => {
	let service: HttpService;
	let httpTestingController: HttpTestingController;
	const mockPost: IPost = {
		kind: 'StdVal',
		data: {
			id: 'StdVal',
			author: 'NoAuthor',
			subreddit_name_prefixed: 'r/empty-subreddit-value',
			title: 'StdTitle',
			score: 0,
			num_comments: 0,
			thumbnail: '',
			thumbnail_height: null,
			thumbnail_width: null,
		},
	};
	const mockRawServerResponse: IRawResponseData = {
		kind: 'Listing',
		data: {
			after: 't3_1169lfw',
			dist: 25,
			modhash: 'qfhkt24jm25d06417eb0997e5275ab1558e29971bde29e5071',
			geo_filter: null,
			children: [mockPost],
			before: null,
		},
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		}).compileComponents();

		httpTestingController = TestBed.get(HttpTestingController);
		service = TestBed.inject(HttpService);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('returned observable should match right type when requesting for Posts', () => {
		const mockPosts: IRawResponseData = mockRawServerResponse;

		service.getHomepagePosts().subscribe(posts => {
			expect(mockPost.kind).toEqual('StdVal');
		});

		expect(service).toBeTruthy();

		const req = httpTestingController.expectOne('https://www.reddit.com/.json');
		expect(req.request.method).toEqual('GET');
		expect(req.request.responseType).toEqual('json');

		req.flush(mockPosts);
	});
});
