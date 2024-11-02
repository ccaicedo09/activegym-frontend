import { Component, inject, Input, OnInit } from '@angular/core';
import { MembershipsService } from '../../../services/memberships/memberships.service';
import { MembershipType } from '../../../models/memberships/membershiptype.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-membership-type-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './membership-type-list.component.html',
  styleUrl: './membership-type-list.component.css'
})
export default class MembershipTypeListComponent implements OnInit{

  @Input() isAdmin: boolean = false;
  private membershipService = inject(MembershipsService);


  membershipTypes: MembershipType[] = []

  ngOnInit(): void {
    this.fetchMembershipTypes();
  }

  fetchMembershipTypes() {
    this.membershipService.getMembershipTypes()
      .subscribe((membershipTypes) => {
        this.membershipTypes = membershipTypes;
    });
  }

  parseDescription(description: string): string[] {
    return description
      .split('-')
      .map(item => item.trim())
      .filter(item => item !== '');
  }

}
