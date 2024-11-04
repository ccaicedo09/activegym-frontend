import { Component, inject, Inject, OnInit } from '@angular/core';
import { User } from '../../../models/users/users.interface';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/users/users.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export default class UserListComponent implements OnInit {

  private userService = inject(UserService);

  users: User[] = [];
  edit: string = 'edit';

  // Pagination
  page: number = 0;
  size: number = 12;
  totalPages: number = 0;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.list(this.page, this.size)
      .subscribe((response) => {
        this.users = response.content;
        this.totalPages = response.totalPages;
      });
  }

  nextPage() {
    if(this.page < this.totalPages - 1) {
      this.page++;
      this.loadUsers();
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.loadUsers();
    }
  }
}
