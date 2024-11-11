import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-view',
  standalone: true,
  imports: [],
  templateUrl: './welcome-view.component.html',
  styleUrl: './welcome-view.component.css'
})
export default class WelcomeViewComponent {
  userName = localStorage.getItem('userName');
}
