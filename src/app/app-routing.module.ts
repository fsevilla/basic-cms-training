import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './globals/guards/authentication.guard';
import { UnauthenticationGuard } from './globals/guards/unauthentication.guard';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { PostsListComponent } from './modules/posts/posts-list/posts-list.component';
import { AlbumsComponent } from './modules/gallery/albums/albums.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [UnauthenticationGuard] },
  { path: 'logout', component: LogoutComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthenticationGuard], children: [
    { path: '', component: UsersListComponent },
    { path: ':userId', component: UserDetailsComponent }
  ] },
  { path: 'posts', loadChildren: () => import('./modules/posts/posts.module').then(mod => mod.PostsModule) },
  { path: 'gallery', loadChildren: () => import('./modules/gallery/gallery.module').then(mod => mod.GalleryModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
