import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';

const appRoutes: Routes = [
	{
		path: '',
		component: NewsFeedComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'u/:id',
		component: LoginComponent
	}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
