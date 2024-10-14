import { Component, inject, Inject, OnInit } from '@angular/core';
import { User } from '../../models/users/users.interface';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/users/users.service';

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

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.list()
      .subscribe((users) => {
        this.users = users;
      });
  }
}
