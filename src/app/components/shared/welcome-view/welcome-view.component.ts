import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-welcome-view',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './welcome-view.component.html',
  styleUrl: './welcome-view.component.css'
})
export default class WelcomeViewComponent {
  userName = localStorage.getItem('userName');
}
