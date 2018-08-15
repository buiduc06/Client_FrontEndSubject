import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './component/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { SidebarLeftFixedComponent } from './component/sidebar-left-fixed/sidebar-left-fixed.component';
import { SidebarRightFixedComponent } from './component/sidebar-right-fixed/sidebar-right-fixed.component';
import { HeaderBpComponent } from './component/header-bp/header-bp.component';
import { WindownPopupChatComponent } from './component/windown-popup-chat/windown-popup-chat.component';
import { WindownPopupComponent } from './component/windown-popup/windown-popup.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { ProfileComponent } from './profile/profile.component';
import { BoxFriendSuggestionsComponent } from './component/box-friend-suggestions/box-friend-suggestions.component';
import { BoxActivityFeedComponent } from './component/box-activity-feed/box-activity-feed.component';
import { BoxPageYouMayLikeComponent } from './component/box-page-you-may-like/box-page-you-may-like.component';
import { BoxCalendarComponent } from './component/box-calendar/box-calendar.component';
import { BoxWeatherComponent } from './component/box-weather/box-weather.component';
import { BoxBirthdayComponent } from './component/box-birthday/box-birthday.component';
import { AuthComponent } from './service/auth/auth.component';
import { TokenInterceptor } from './guards/intercreptors/token.intercreptor';
import { ProfileHeaderComponent } from './component/profile-header/profile-header.component';
import { ShowImgPopupComponent } from './component/show-img-popup/show-img-popup.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ProfileAboutComponent } from './component/profile-about/profile-about.component';
import { ProfileFriendsComponent } from './component/profile-friends/profile-friends.component';
import { ProfilePhotosComponent } from './component/profile-photos/profile-photos.component';
import { ProfileHomeComponent } from './component/profile-home/profile-home.component';
import { ProfileChangePersionInfoComponent } from './component/profile-change-persion-info/profile-change-persion-info.component';
import { ProfileChangePasswordComponent } from './component/profile-change-password/profile-change-password.component';
import { ProfileSettingsComponent } from './component/profile-settings/profile-settings.component';
// import { RefreshTokenInterceptor } from './guards/intercreptors/refreshToken.intercreptor';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarLeftFixedComponent,
    SidebarRightFixedComponent,
    HeaderBpComponent,
    WindownPopupChatComponent,
    WindownPopupComponent,
    NewsFeedComponent,
    ProfileComponent,
    BoxFriendSuggestionsComponent,
    BoxActivityFeedComponent,
    BoxPageYouMayLikeComponent,
    BoxCalendarComponent,
    BoxWeatherComponent,
    BoxBirthdayComponent,
    AuthComponent,
    ProfileHeaderComponent,
    ShowImgPopupComponent,
    NotFoundComponent,
    ProfileAboutComponent,
    ProfileFriendsComponent,
    ProfilePhotosComponent,
    ProfileHomeComponent,
    ProfileChangePersionInfoComponent,
    ProfileChangePasswordComponent,
    ProfileSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
   { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, 
   // { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
