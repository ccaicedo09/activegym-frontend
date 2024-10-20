import { Component } from '@angular/core';
import HomeNavComponent from "../../components/home-nav/home-nav.component";
import MembershipTypeListComponent from "../../components/membership-type-list/membership-type-list.component";

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [HomeNavComponent, MembershipTypeListComponent],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export default class PlansComponent {

}
