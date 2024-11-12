import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/users/users.service';
import { MembershipsService } from '../../../services/memberships/memberships.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transfer-membership',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transfer-membership.component.html',
})
export default class TransferMembershipComponent implements OnInit {
  membershipId: number = 0;
  membershipTypeName: string = '';
  userDocument: string = '';
  transferDocument: number | null = null;
  userFound: any = null;
  isLoading: boolean = false;

  private router = inject(Router);
  private userService = inject(UserService);
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

  searchUser() {
    this.isLoading = true;
      if (this.transferDocument !== null) {
        this.userService.get(this.transferDocument).subscribe({
          next: (user: any) => {
            this.userFound = user;
            this.isLoading = false;
          },
          error: () => {
            this.userFound = null;
            this.isLoading = false;
          }
        });
      }
  }

  transferMembership() {
    if (this.userFound && this.transferDocument) {
      const transferBody = {
        membershipId: this.membershipId,
        newUserDocument: this.transferDocument.toString()
      };
      this.membershipsService.transfer(transferBody).subscribe({
        next: () => {
          setTimeout(() => {
            this.router.navigate(['/dashboard/users/' + this.userFound.document]);
          }, 2500);
        },
        error: () => {
          this.resetForm();
        }
      });
    }
  }

  resetForm() {
    this.transferDocument = null;
    this.userFound = null;
  }
}
