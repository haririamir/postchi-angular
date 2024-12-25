import { Component } from '@angular/core';
import { CommentsService } from './comments.service';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';

@Component({
  selector: 'app-comments-analyse',
  imports: [BarChartComponent],
  templateUrl: './comments-analyse.component.html',
  styleUrl: './comments-analyse.component.scss',
})
export class CommentsAnalyseComponent {
  chartData: { userId: number; averageCharacters: number }[] = [];
  constructor(private commnetService: CommentsService) {
    this.fetchAndProcessData();
  }

  fetchAndProcessData() {
    this.commnetService.fetchData().subscribe(([posts, comments, users]) => {
      const userCommentData: { userId: number; averageCharacters: number }[] =
        users.map((user) => {
          const userPosts = posts.filter((post) => post.userId === user.id);

          const userComments = comments.filter((comment) =>
            userPosts.some((post) => post.id === comment.postId)
          );

          const totalCharacters = userComments.reduce(
            (sum, comment) => sum + comment.body.length,
            0
          );
          const averageCharacters =
            userComments.length > 0 ? totalCharacters / userComments.length : 0;

          return { userId: user.id, averageCharacters };
        });

      console.log(userCommentData);
      this.chartData = userCommentData;
    });
  }
}
