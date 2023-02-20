import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { SearchbarComponent } from './searchbar.component';

describe('SearchbarComponent', () => {
	let component: SearchbarComponent;
	let fixture: ComponentFixture<SearchbarComponent>;
	let store: MockStore;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [SearchbarComponent],
			providers: [provideMockStore()],
			imports: [IonicModule.forRoot()],
		}).compileComponents();

		fixture = TestBed.createComponent(SearchbarComponent);
		component = fixture.componentInstance;
		store = TestBed.get<Store>(Store);
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
