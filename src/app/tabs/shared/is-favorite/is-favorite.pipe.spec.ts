import { TestBed, waitForAsync } from '@angular/core/testing';
import { PostsService } from './../../../shared/services/posts.service';
import { IsFavoritePipe } from './is-favorite.pipe';

describe('IsFavoritePipe', () => {
	it('create an instance', () => {
		const pipe = new IsFavoritePipe();
		expect(pipe).toBeTruthy();
	});
});
