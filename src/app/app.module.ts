import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './core/services/auth.service';
import { TvShowService } from './core/services/tv-show.service';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/components/shared/shared.module';

import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { TvShowListComponent } from './components/tv-shows/tv-show-list/tv-show-list.component';
import { TvShowCreateComponent } from './components/tv-shows/tv-show-create/tv-show-create.component';
import { TvShowEditComponent } from './components/tv-shows/tv-show-edit/tv-show-edit.component';
import { TvShowDeleteComponent } from './components/tv-shows/tv-show-delete/tv-show-delete.component';
import { TokenInterceptor } from './core/interceptor/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TvShowListComponent,
    TvShowCreateComponent,
    TvShowEditComponent,
    TvShowDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    AuthService,
    TvShowService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
