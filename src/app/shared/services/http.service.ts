import { SubredditService } from 'src/app/shared/services/subreddit.service';
import { ISubreddit } from './../models/ISubreddit';
import { IPost } from '../models/IPost';
import { IRawResponseData } from '../models/IRawResposeData';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class HttpService {
	private readonly http: HttpClient = inject(HttpClient);
	private readonly subredditService: SubredditService = inject(SubredditService);
	private readonly redditHomepage: string = 'https://www.reddit.com/';

	public getHomepagePosts(): Observable<IPost[]> {
		return this.http
			.get<IRawResponseData>(`${this.redditHomepage}.json`)
			.pipe(map((value: IRawResponseData) => value.data.children)) as Observable<IPost[]>;
	}

	public getSubredditPosts(subredditName: string): Observable<IPost[]> {
		return this.http
			.get<IRawResponseData>(`${this.redditHomepage}${subredditName}.json`)
			.pipe(map((value: IRawResponseData) => value.data.children)) as Observable<IPost[]>;
	}

	public getMoreSubredditPosts(
		subredditName: string,
		afterPostName: string,
		limit: number
	): Observable<IPost[]> {
		return this.http
			.get<IRawResponseData>(`${this.redditHomepage}r/${subredditName}.json`, {
				params: new HttpParams().set('after', afterPostName).set('limit', limit),
			})
			.pipe(map((value: IRawResponseData) => value.data.children)) as Observable<IPost[]>;
	}

	public getMoreHomepagePosts(lastPostName: string, limit: number): Observable<IPost[]> {
		return this.http
			.get<IRawResponseData>(`${this.redditHomepage}.json`, {
				params: new HttpParams().set('after', lastPostName).set('limit', limit),
			})
			.pipe(map((value: IRawResponseData) => value.data.children)) as Observable<IPost[]>;
	}

	public getSubredditsByString(subredditName: string): Observable<ISubreddit[]> {
		return this.http
			.get<IRawResponseData>('https://www.reddit.com/subreddits/search.json', {
				params: new HttpParams().set('q', subredditName).set('type', 'sr'),
			})
			.pipe(map((value: IRawResponseData) => value.data.children)) as Observable<
			ISubreddit[]
		>;
	}

	public getRandomSubredditPosts(): Observable<IPost[]> {
		return this.http
			.get<IRawResponseData>(`https://corsproxy.io/?${this.redditHomepage}r/random/.json`)
			.pipe(map((value: IRawResponseData) => value.data.children)) as Observable<IPost[]>;
	}
}
