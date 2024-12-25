import { Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { PostsComponent } from './pages/posts/posts.component';
import { CommentsAnalyseComponent } from './pages/comments-analyse/comments-analyse.component';

export const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'posts/:userId', component: PostsComponent },
  { path: 'comments/analyseis', component: CommentsAnalyseComponent },
  // { path: 'posts', component: UsersComponent },
];
