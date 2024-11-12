import { Component, inject, Input, OnInit } from '@angular/core';
import { MembershipsService } from '../../../services/memberships/memberships.service';
import { MembershipType } from '../../../models/memberships/membershiptype.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import MembershipTypeFormComponent from "../../admin/membership-type-form/membership-type-form.component";
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-membership-type-list',
  standalone: true,
  imports: [CommonModule, MembershipTypeFormComponent],
  templateUrl: './membership-type-list.component.html',
  styleUrl: './membership-type-list.component.css'
})
export default class MembershipTypeListComponent implements OnInit{

  @Input() isAdmin: boolean = false;
  private membershipService = inject(MembershipsService);
  private router = inject(Router);

  membershipTypes: MembershipType[] = []
  selectedMembershipType: MembershipType | null = null;

  ngOnInit(): void {
    this.fetchMembershipTypes();
  }

  fetchMembershipTypes(): void {
    this.membershipService.getMembershipTypes().subscribe((membershipTypes) => {
      let filteredMembershipTypes = membershipTypes;

      if (!this.isAdmin) {
        filteredMembershipTypes = membershipTypes.filter(type => type.isVisible);
      }

      this.membershipTypes = filteredMembershipTypes.sort((a, b) => a.duration - b.duration);
    });
  }

  parseDescription(description: string): string[] {
    return description
      .split('-')
      .map(item => item.trim())
      .filter(item => item !== '');
  }

  toggleVisibility(id: number) {
    this.membershipService.toggleMembershipTypeVisibility(id)
      .subscribe(() => {
        this.fetchMembershipTypes();
      });
      this.router.navigate(['/dashboard/gymconfig']);
  }

  openModal(type?: MembershipType): void {
    this.selectedMembershipType = type || null;
    const modalElement = document.getElementById('membershipModal');
    if (modalElement) {
      const bootstrapModal = new bootstrap.Modal(modalElement);
      bootstrapModal.show();
    }
  }
}
