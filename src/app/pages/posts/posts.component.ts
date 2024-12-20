import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WidgetTableComponent } from '../../components/widgets/widget-table/widget-table.component';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from "../../components/widgets/widget-table/header/header.component";

const END_POINT_POST = 'https://jsonplaceholder.typicode.com/users';

interface IPost {
  title: string;
  body: string;
}
@Component({
  selector: 'app-posts',
  imports: [WidgetTableComponent, HeaderComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  posts: IPost[] = [];
  columns: any[] = [
    { key: 'title', label: 'Title' },
    { key: 'body', label: 'Body' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.fetchPosts();
  }

  ngOnInit() {}

  private fetchPosts() {
    const userId = this.route.snapshot.paramMap.get('userId')!;
    this.http.get<IPost[]>(`${END_POINT_POST}/${userId}/posts`).subscribe({
      next: (response) => {
        this.posts = response;
      },
    });
  }
}
