import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { TabsPage } from './tabs.page';

describe('TabsPage', () => {
	let component: TabsPage;
	let fixture: ComponentFixture<TabsPage>;
	let store: MockStore<{ loggedIn: boolean }>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TabsPage],
			providers: [provideMockStore()],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TabsPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
