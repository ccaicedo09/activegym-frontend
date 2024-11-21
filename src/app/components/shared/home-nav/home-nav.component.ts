import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';
import { LanguageSelectorComponent } from "../language-selector/language-selector.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-nav',
  standalone: true,
  imports: [RouterLink, CommonModule, LanguageSelectorComponent, TranslateModule],
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
