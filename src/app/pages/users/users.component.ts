import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Subject,
  switchMap,
} from 'rxjs';
import { IUser } from '../../types/user.model';
import { WidgetSearchComponent } from '../../components/widgets/widget-search/widget-search.component';
import { Route, Router } from '@angular/router';
import { HeaderComponent } from "../../components/widgets/widget-table/header/header.component";

const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  imports: [WidgetSearchComponent, HeaderComponent],
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  private searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  name = new FormControl('');
  filterText: string = '';
  users: IUser[] = [];
  filteredData: IUser[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.fetchUsers();
  }

  ngOnInit() {
    alert;
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => {
          this.filteredData = this.handleSearch(term);
          return [];
        })
      )
      .subscribe();
  }

  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue);
    this.filterText = searchValue;
  }

  private fetchUsers(): void {
    this.http.get<IUser[]>(USERS_API_URL).subscribe({
      next: (response) => {
        this.users = response;
        this.filteredData = response;
      },
      error: (error) => {
        console.error('Failed to fetch users', error);
      },
    });
  }

  private handleSearch(search: string): IUser[] {
    return this.users.filter((item) => {
      return Object.values(item).some((value) => {
        return value?.toString().toLowerCase().includes(search.toLowerCase());
      });
    });
  }
  handleUsersPost(user: IUser) {
    this.router.navigate([`/posts/${user.id}`]);
  }
}
