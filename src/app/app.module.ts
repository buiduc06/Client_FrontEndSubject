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
    ProfileHeaderComponent
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
