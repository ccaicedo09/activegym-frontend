import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Membership } from '../../../models/memberships/memberships.interface';
import { MembershipsService } from '../../../services/memberships/memberships.service';
import MembershipFormComponent from "../membership-form/membership-form.component";
import { NgModel } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MembershipType } from '../../../models/memberships/membershiptype.interface';
import { LoginService } from '../../../services/auth/login.service';

@Component({
  selector: 'app-memberships-list',
  standalone: true,
  imports: [RouterLink, CommonModule, MembershipFormComponent, MatTooltipModule],
  templateUrl: './memberships-list.component.html',
  styleUrl: './memberships-list.component.css'
})
export default class MembershipsListComponent implements OnInit{

  private membershipsService = inject(MembershipsService);
  private loginService = inject(LoginService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  user ?: boolean;
  memberships: Membership[] = [];
  filteredMemberships: Membership[] = [];
  membershipTypes: MembershipType[] = [];
  searchText: string = '';
  hasActiveMembership: boolean = false;
  roles: any[] = [];

  // Pagination
  page: number = 0;
  size: number = 12;
  totalPages: number = 0;

  ngOnInit(): void {

    this.loginService.getRoles().subscribe((roles) => {
      this.roles = roles;
    })

    const userDocument = this.route.snapshot.paramMap.get('document');

    this.membershipsService.getMembershipTypes().subscribe((membershipTypes) => {
      this.membershipTypes = membershipTypes;
    })

    if(userDocument) {
      this.membershipsService.get(parseInt(userDocument))
      .subscribe((memberships) => {
        this.memberships = memberships;
        this.filteredMemberships = memberships;
        this.checkActiveMembership();
      });
      this.user = true;
    } else if (this.router.url.includes('my-memberships')) {
      this.membershipsService.getSelf().subscribe((memberships) => {
        this.memberships = memberships;
        this.filteredMemberships = memberships;
      })
    } else {
      this.user = false;
      this.loadMemberships();
    }
  }

  loadMemberships() {
    this.membershipsService.list(this.page, this.size)
    .subscribe((response) => {
      this.memberships = response.content;
      this.totalPages = response.totalPages;
      this.filteredMemberships = response.content;
    });
  }

  isTransferable(membershipTypeName: string): boolean {
    return this.membershipTypes.some(
      (type) => type.name === membershipTypeName && type.isTransferable
    );
  }

  isFreezable(membershipTypeName: string): boolean {
    return this.membershipTypes.some(
      (type) => type.name === membershipTypeName && type.isFreezable
    );
  }

  nextPage() {
    if(this.page < this.totalPages - 1) {
      this.page++;
      this.loadMemberships();
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.loadMemberships();
    }
  }

  checkActiveMembership() {
    this.hasActiveMembership = this.memberships.some(
      (membership) => membership.membershipStatus === 'ACTIVA'
    );
  }

  hasRole(roles: string[]): boolean {
    return roles.some((role) => this.roles.includes(role));
  }
}
