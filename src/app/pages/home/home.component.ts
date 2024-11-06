import { Component, inject, Inject, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import HomeNavComponent from "../../components/shared/home-nav/home-nav.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, HomeNavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {

}
