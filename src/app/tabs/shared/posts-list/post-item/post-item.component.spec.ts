import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { PostItemComponent } from './post-item.component';

describe('PostItemComponent', () => {
	let component: PostItemComponent;
	let fixture: ComponentFixture<PostItemComponent>;
	let store: MockStore;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [PostItemComponent],
			imports: [IonicModule.forRoot()],
			providers: [provideMockStore()],
		}).compileComponents();

		fixture = TestBed.createComponent(PostItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it("should be created with standart @Input() 'post'", () => {
		expect(component.post.kind).toEqual('StdVal');
	});

	it("standart @Input() 'post' image should not be available", () => {
		expect(component.thumbnailIsAvailable).toEqual(false);
	});

	it("standart @Input() 'post' score should be 0", () => {
		expect(component.post.data.score).toEqual(0);
	});

	it("standart @Input() 'post' comments count should be 0", () => {
		expect(component.post.data.num_comments).toEqual(0);
	});
});
