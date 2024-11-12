import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembershipsService } from '../../../services/memberships/memberships.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-freeze-membership',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './freeze-membership.component.html',
})
export default class FreezeMembershipComponent implements OnInit {
  membershipId: number = 0;
  membershipTypeName: string = '';
  userDocument: string = '';
  days: number = 0;

  private router = inject(Router);
  private membershipsService = inject(MembershipsService)

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    this.membershipId = navigation?.extras.state?.['membershipId'] || 0;
    this.membershipTypeName = navigation?.extras.state?.['membershipTypeName'] || '';
    this.userDocument = navigation?.extras.state?.['userDocument'] || '';
  }

  ngOnInit(): void {
    if (!this.membershipId) {
      this.router.navigate(['/dashboard/memberships-list']);
      return;
    }
  }

  freezeMembership() {
    const freezeBody = {
      membershipId: this.membershipId,
      days: this.days
    };
    this.membershipsService.freeze(freezeBody).subscribe({
      next: () => {
        setTimeout(() => {
          this.router.navigate(['/dashboard/memberships-list']);
        }, 2500);
      },
      error: () => {
        this.resetForm();
      }
    });
  }

  resetForm() {
    this.days = 0;
  }
}
