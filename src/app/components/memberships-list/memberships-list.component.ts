import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { Membership } from '../../models/memberships/memberships.interface';
import { MembershipsService } from '../../services/memberships/memberships.service';
import { User } from '../../models/users/users.interface';
import MembershipFormComponent from "../membership-form/membership-form.component";

@Component({
  selector: 'app-memberships-list',
  standalone: true,
  imports: [RouterLink, CommonModule, NgClass, MembershipFormComponent],
  templateUrl: './memberships-list.component.html',
  styleUrl: './memberships-list.component.css'
})
export default class MembershipsListComponent implements OnInit{

  private membershipsService = inject(MembershipsService);
  private route = inject(ActivatedRoute);

  user ?: boolean;
  memberships: Membership[] = [];
  hasActiveMembership: boolean = false;

  ngOnInit(): void {
    const userDocument = this.route.snapshot.paramMap.get('document');

    if(userDocument) {
      this.membershipsService.get(parseInt(userDocument))
      .subscribe((memberships) => {
        this.memberships = memberships;
        this.checkActiveMembership();
      });
      this.user = true;
    } else {
      this.user = false;
      this.loadMemberships();
    }
  }

  loadMemberships() {
    this.membershipsService.list()
    .subscribe((memberships) => {
      this.memberships = memberships;
    });
  }

  checkActiveMembership() {
    this.hasActiveMembership = this.memberships.some(
      (membership) => membership.membershipStatus === 'ACTIVA'
    );
  }
}
