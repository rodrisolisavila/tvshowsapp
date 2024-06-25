import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { TvShowListComponent } from './components/tv-shows/tv-show-list/tv-show-list.component';
import { TvShowCreateComponent } from './components/tv-shows/tv-show-create/tv-show-create.component';
import { TvShowEditComponent } from './components/tv-shows/tv-show-edit/tv-show-edit.component';
import { TvShowDeleteComponent } from './components/tv-shows/tv-show-delete/tv-show-delete.component';


const routes: Routes = [
  { path: '', redirectTo: 'tv-show-list', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: 'tv-show-list', component: TvShowListComponent, canActivate: [AuthGuard] },
  { path: 'tv-show-create', component: TvShowCreateComponent, canActivate: [AuthGuard] },
  { path: 'tv-show-edit/:id', component: TvShowEditComponent, canActivate: [AuthGuard] },
  { path: 'tv-show-delete/:id', component: TvShowDeleteComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'tv-show-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
