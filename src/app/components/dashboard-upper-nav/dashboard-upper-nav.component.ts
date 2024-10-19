import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-upper-nav',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-upper-nav.component.html',
  styleUrl: './dashboard-upper-nav.component.css'
})
export class DashboardUpperNavComponent implements OnInit{

  private loginService = inject(LoginService);
  private router = inject(Router);

  userName: String = "";
  userRol: String = "";

  ngOnInit(): void {
    this.userName = sessionStorage.getItem("userName") || "";
    this.userRol = sessionStorage.getItem("userRoles") || "";
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }

}
