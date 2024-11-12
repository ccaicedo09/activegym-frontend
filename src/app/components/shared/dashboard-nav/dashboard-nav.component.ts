import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-dashboard-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, MatTooltipModule],
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

  hasRole(roles: string[]): boolean {
    return roles.some((role) => this.roles.includes(role));
  }
}
