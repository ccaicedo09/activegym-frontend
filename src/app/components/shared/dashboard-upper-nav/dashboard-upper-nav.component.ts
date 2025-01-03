import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service';
import { Router, RouterLink } from '@angular/router';
import NotificationBellComponent from "./notification-bell/notification-bell.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { LanguageSelectorComponent } from "../language-selector/language-selector.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-upper-nav',
  standalone: true,
  imports: [RouterLink, NotificationBellComponent, MatTooltipModule, CommonModule, LanguageSelectorComponent, TranslateModule],
  templateUrl: './dashboard-upper-nav.component.html',
  styleUrl: './dashboard-upper-nav.component.css'
})
export class DashboardUpperNavComponent implements OnInit{

  private loginService = inject(LoginService);
  private router = inject(Router);
  roles: any[] = [];

  userName: String = "";
  profilePicture: String = "";

  ngOnInit(): void {
    this.userName = localStorage.getItem("userName") || "";
    this.profilePicture = localStorage.getItem("profilePicture") || "";
    this.loginService.getRoles().subscribe((roles) => {
      this.roles = roles;
    })
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }

  hasRole(roles: string[]): boolean {
    return roles.some((role) => this.roles.includes(role));
  }
}
