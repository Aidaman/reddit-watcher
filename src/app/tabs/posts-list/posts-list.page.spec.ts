import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './../shared/posts-list/posts.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { SimplePostsList } from './posts-list.page';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SimplePostsList', () => {
	let component: SimplePostsList;
	let fixture: ComponentFixture<SimplePostsList>;
	let store: MockStore;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SimplePostsList, PostsComponent, SearchbarComponent],
			providers: [provideMockStore()],
			imports: [IonicModule.forRoot(), CommonModule, FormsModule, ReactiveFormsModule],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(SimplePostsList);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
