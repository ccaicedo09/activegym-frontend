import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-home-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home-nav.component.html',
  styleUrl: './home-nav.component.css'
})
export default class HomeNavComponent implements OnInit{
  private loginService = inject(LoginService);
  userLogged: boolean = false;

  ngOnInit(): void {
    this.loginService.getUserLogged().subscribe((logged) => {
      this.userLogged = logged;
    });
}
}
