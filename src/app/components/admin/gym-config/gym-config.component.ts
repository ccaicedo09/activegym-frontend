import { Component } from '@angular/core';
import MembershipTypeListComponent from "../../shared/membership-type-list/membership-type-list.component";
import GymTeamListComponent from "../gym-team-list/gym-team-list.component";
import MembershipTypeFormComponent from "../membership-type-form/membership-type-form.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-gym-config',
  standalone: true,
  imports: [MembershipTypeListComponent, GymTeamListComponent, TranslateModule],
  templateUrl: './gym-config.component.html',
  styleUrl: './gym-config.component.css'
})
export default class GymConfigComponent {

}
