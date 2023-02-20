import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PostsComponent } from './posts.component';

describe('PostsComponent', () => {
	let component: PostsComponent;
	let fixture: ComponentFixture<PostsComponent>;
	let store: MockStore;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [PostsComponent],
			providers: [provideMockStore()],
			imports: [IonicModule.forRoot()],
		}).compileComponents();

		fixture = TestBed.createComponent(PostsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
