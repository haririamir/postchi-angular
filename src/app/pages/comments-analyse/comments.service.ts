import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { IPost } from '../../types/post.model';
import { IComment } from '../../types/comment.model';
import { IUser } from '../../types/user.model';


const END_POINT = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {}

  fetchData() {
    const posts$ = this.http.get<IPost[]>(`${END_POINT}/posts`);
    const comments$ = this.http.get<IComment[]>(`${END_POINT}/comments`);
    const users$ = this.http.get<IUser[]>(`${END_POINT}/users`);
  
    return forkJoin([posts$, comments$, users$]);
  }
}
