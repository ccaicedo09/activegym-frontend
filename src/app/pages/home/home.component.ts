import { Component, inject, Inject, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent implements OnInit {
  private loginService = inject(LoginService);
  userLogged: boolean = false;

  ngOnInit(): void {
      this.loginService.getUserLogged().subscribe((logged) => {
        this.userLogged = logged;
      });
  }
}
