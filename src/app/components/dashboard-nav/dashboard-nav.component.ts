import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dashboard-nav.component.html',
  styleUrl: './dashboard-nav.component.css'
})
export default class DashboardNavComponent {

}
