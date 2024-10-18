import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users/users.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../../models/users/users.interface';
import UserFormComponent from "../user-form/user-form.component";
import UserOverviewComponent from "../user-overview/user-overview.component";
import MembershipsListComponent from "../memberships-list/memberships-list.component";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterLink, UserFormComponent, UserOverviewComponent, MembershipsListComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export default class UserDetailsComponent implements OnInit {

    user: User | undefined;

    constructor(
      private userService: UserService,
      private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
      const userDocument = Number(this.route.snapshot.paramMap.get('document'));
      if (userDocument) {
        this.loadUser(userDocument);
      }
    }

    loadUser(document: number) {
      this.userService.get(document).subscribe(
        (userInfo) => {
          this.user = userInfo;
        },
        (error) => {
          console.error("Error al cargar la información del usuario: ", error);
        }
      );
    }
}
