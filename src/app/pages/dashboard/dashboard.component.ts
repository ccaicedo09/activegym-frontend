import { Component } from '@angular/core';
import DashboardNavComponent from "../../components/dashboard-nav/dashboard-nav.component";
import { DashboardUpperNavComponent } from "../../components/dashboard-upper-nav/dashboard-upper-nav.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardNavComponent, DashboardUpperNavComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {

}
