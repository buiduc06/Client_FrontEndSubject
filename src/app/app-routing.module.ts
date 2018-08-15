import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ProfileAboutComponent } from './component/profile-about/profile-about.component';
import { ProfileHomeComponent } from './component/profile-home/profile-home.component';
import { ProfilePhotosComponent } from './component/profile-photos/profile-photos.component';
import { ProfileFriendsComponent } from './component/profile-friends/profile-friends.component';
import { ProfileChangePersionInfoComponent } from './component/profile-change-persion-info/profile-change-persion-info.component';
import { ProfileChangePasswordComponent } from './component/profile-change-password/profile-change-password.component';
import { ProfileSettingsComponent } from './component/profile-settings/profile-settings.component';
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
	component: ProfileComponent,
	canActivate: [AuthGuard],
	children: [
	{path: '', component:ProfileHomeComponent },
	{path: 'settings', component:ProfileSettingsComponent,
		children: [
		{path: '', component:ProfileChangePersionInfoComponent },
		{path: 'changepassword', component:ProfileChangePasswordComponent }
		],
	}
	],
},
{path: 'u/about/:id', component: ProfileAboutComponent, canActivate: [AuthGuard]},
{path: 'u/friends/:id', component: ProfileFriendsComponent, canActivate: [AuthGuard],},
{path: 'u/photos/:id', component: ProfilePhotosComponent, canActivate: [AuthGuard]},
{path: 'not-found', component: NotFoundComponent },
{path: '**', redirectTo: '/not-found',
}
];

@NgModule({
	imports: [
	RouterModule.forRoot(appRoutes)
	],

	exports: [RouterModule]
})
export class AppRoutingModule { }
