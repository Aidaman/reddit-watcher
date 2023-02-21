import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubredditEffect } from './store/subreddits/subreddit.effect';
import { subredditReducer } from './store/subreddits/subreddit.reducer';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsEffect } from './store/posts/posts.effect';
import { postsReducer } from './store/posts/posts.reducer';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		HammerModule,
		BrowserAnimationsModule,

		StoreModule.forRoot({ posts: postsReducer, subreddit: subredditReducer }),
		EffectsModule.forRoot([PostsEffect, SubredditEffect]),
		StoreDevtoolsModule.instrument(),
	],
	providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
	bootstrap: [AppComponent],
})
export class AppModule {}
