import { Component } from '@angular/core';
import MembershipTypeListComponent from "../membership-type-list/membership-type-list.component";
import GymTeamListComponent from "../gym-team-list/gym-team-list.component";

@Component({
  selector: 'app-gym-config',
  standalone: true,
  imports: [MembershipTypeListComponent, GymTeamListComponent],
  templateUrl: './gym-config.component.html',
  styleUrl: './gym-config.component.css'
})
export default class GymConfigComponent {

}
