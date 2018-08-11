import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
const appRoutes: Routes = [
	{
		path: '',
		component: NewsFeedComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'u/:id',
		component: ProfileComponent
	},
	{
		path: 'not-found',
		component: NotFoundComponent
	},
	{
		path: '**', 
		redirectTo: '/not-found',
	}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
