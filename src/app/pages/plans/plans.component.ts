import { Component } from '@angular/core';
import HomeNavComponent from "../../components/shared/home-nav/home-nav.component";
import MembershipTypeListComponent from "../../components/shared/membership-type-list/membership-type-list.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [HomeNavComponent, MembershipTypeListComponent, TranslateModule],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export default class PlansComponent {

}
