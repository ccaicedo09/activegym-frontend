import { Component } from '@angular/core';
import UserOverviewComponent from "../../user-overview/user-overview.component";
import UserFormComponent from "../../management/user-form/user-form.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [UserOverviewComponent, UserFormComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export default class UserProfileComponent {

}
