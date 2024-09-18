import { Component } from '@angular/core';
import DashboardNavComponent from "../../components/dashboard-nav/dashboard-nav.component";
import { DashboardUpperNavComponent } from "../../components/dashboard-upper-nav/dashboard-upper-nav.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardNavComponent, DashboardUpperNavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {

}
