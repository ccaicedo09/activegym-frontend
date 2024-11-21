import { Component, inject, Inject, OnInit } from '@angular/core';
import { User } from '../../../models/users/users.interface';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/users/users.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, RouterLink, MatTooltipModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export default class UserListComponent implements OnInit {

  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);

  users: User[] = [];
  edit: string = 'edit';
  filterForm !: FormGroup;

  // Pagination
  page: number = 0;
  size: number = 12;
  totalPages: number = 0;

  ngOnInit(): void {
    this.initFilterForm();
    this.loadUsers();
  }

  initFilterForm() {
    this.filterForm = this.formBuilder.group({
      document: [''],
      name: [''],
      phone: ['']
    });

    // Apply real time filters
    this.filterForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.page = 0; // Reset page to 0 when filters change
        this.loadUsers();
      });
  }

  loadUsers() {
    const filters = this.filterForm.value;
    this.userService.list(this.page, this.size, filters)
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
