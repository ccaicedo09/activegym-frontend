import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service';
import { Router, RouterLink } from '@angular/router';
import NotificationBellComponent from "./notification-bell/notification-bell.component";

@Component({
  selector: 'app-dashboard-upper-nav',
  standalone: true,
  imports: [RouterLink, NotificationBellComponent],
  templateUrl: './dashboard-upper-nav.component.html',
  styleUrl: './dashboard-upper-nav.component.css'
})
export class DashboardUpperNavComponent implements OnInit{

  private loginService = inject(LoginService);
  private router = inject(Router);

  userName: String = "";

  ngOnInit(): void {
    this.userName = localStorage.getItem("userName") || "";
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }

}
