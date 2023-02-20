import { PostsService } from 'src/app/shared/services/posts.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { SubredditItemComponent } from './subreddit-item.component';

describe('SubredditItemComponent', () => {
	let component: SubredditItemComponent;
	let fixture: ComponentFixture<SubredditItemComponent>;
	let postsService: PostsService;
	let store: MockStore;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [SubredditItemComponent],
			imports: [IonicModule.forRoot()],
			providers: [PostsService, provideMockStore()],
		}).compileComponents();

		fixture = TestBed.createComponent(SubredditItemComponent);
		postsService = TestBed.inject(PostsService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it("should be created with standart @Input() 'subreddit'", () => {
		expect(component.subreddit.kind).toEqual('StdVal');
	});

	it("standart @Input() 'subreddit' image should not be an url", () => {
		expect(component.iconThumbIsAvailable).toEqual(false);
	});
});
