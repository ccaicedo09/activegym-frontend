import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './dashboard-nav.component.html',
  styleUrl: './dashboard-nav.component.css'
})
export default class DashboardNavComponent implements OnInit {
  private loginService = inject(LoginService);
  roles: any[] = [];

  ngOnInit(): void {
      this.loginService.getRoles().subscribe((roles) => {
        this.roles = roles;
      })
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }
}
