import { Component, inject, OnInit } from '@angular/core';
import { AccessService, UserAccessRespose } from '../../../services/users/access.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-acess-logs',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './manage-acess-logs.component.html',
  styleUrl: './manage-acess-logs.component.css'
})
export default class ManageAcessLogsComponent implements OnInit {

  accessLogs: UserAccessRespose[] = [];
  page: number = 0;
  size: number = 12;
  totalPages: number = 0;
  userDocument: string = '';

  private accessService = inject(AccessService);

  ngOnInit(): void {
    this.loadAccessLogs();
    console.log(this.accessLogs);
  }

  loadAccessLogs(): void {
    if (this.userDocument) {
      this.loadAccessLogsByUser(this.userDocument);
    } else {
      this.loadAllAccessLogs();
    }
  }

  loadAllAccessLogs(): void {
    this.accessService.getAccessLogs(this.page, this.size).subscribe((response) => {
      this.accessLogs = response.content;
      this.totalPages = response.totalPages;
    });
  }

  loadAccessLogsByUser(document: string): void {
    this.accessService.getAccessLogsdByDocument(document, this.page, this.size).subscribe((response) => {
      this.accessLogs = response.content;
      this.totalPages = response.totalPages;
    });
  }

  nextPage(): void {
    this.page++;
    this.loadAccessLogs();
  }

  previousPage(): void {
    this.page--;
    this.loadAccessLogs();
  }

  applyFilter(): void {
    this.page = 0; // Reinicia la paginación al aplicar un filtro
    this.loadAccessLogs();
  }

  clearFilter(): void {
    this.userDocument = '';
    this.page = 0; // Reinicia la paginación al limpiar el filtro
    this.loadAccessLogs();
  }
}
