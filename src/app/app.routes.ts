import { Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { PostsComponent } from './pages/posts/posts.component';

export const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'posts/:userId', component: PostsComponent },
  // { path: 'posts', component: UsersComponent },
];
