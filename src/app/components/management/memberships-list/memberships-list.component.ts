import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Membership } from '../../../models/memberships/memberships.interface';
import { MembershipsService } from '../../../services/memberships/memberships.service';
import MembershipFormComponent from "../membership-form/membership-form.component";
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MembershipType } from '../../../models/memberships/membershiptype.interface';
import { LoginService } from '../../../services/auth/login.service';
import { PdfService } from '../../../services/util/pdf.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-memberships-list',
  standalone: true,
  imports: [RouterLink, CommonModule, MembershipFormComponent, MatTooltipModule, ReactiveFormsModule],
  templateUrl: './memberships-list.component.html',
  styleUrl: './memberships-list.component.css'
})
export default class MembershipsListComponent implements OnInit{

  private membershipsService = inject(MembershipsService);
  private loginService = inject(LoginService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pdfService = inject(PdfService);
  private formBulder = inject(FormBuilder);

  user ?: boolean;
  memberships: Membership[] = [];
  filteredMemberships: Membership[] = [];
  membershipTypes: MembershipType[] = [];
  searchText: string = '';
  hasActiveMembership: boolean = false;
  roles: any[] = [];
  filterForm !: FormGroup;

  // Pagination
  page: number = 0;
  size: number = 12;
  totalPages: number = 0;

  ngOnInit(): void {
    this.loginService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });

    this.initFilterForm();
    this.loadMembershipTypes();

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

  initFilterForm() {
    this.filterForm = this.formBulder.group({
      userDocument: [''],
      membershipType: [''],
      membershipStatus: [''],
      frozen: [''],
      transferred: ['']
    });

    // Apply real time filters
    this.filterForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.page = 0; // Reset page to 0 when filters change
        this.loadMemberships();
      });
  }

  resetFilters() {
    this.page = 0;
    this.filterForm.reset({
      membershipType: { value: '', disabled: false },
      membershipStatus: { value: '', disabled: false },
    });
  }

  loadMemberships() {
    const filters = this.filterForm.value;
    this.membershipsService.list(this.page, this.size, filters)
    .subscribe((response) => {
      this.memberships = response.content;
      this.totalPages = response.totalPages;
      this.filteredMemberships = response.content;
    });
  }

  loadMembershipTypes() {
    this.membershipsService.getMembershipTypes().subscribe((membershipTypes) => {
      this.membershipTypes = membershipTypes;
    })
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

  generateInvoice(membership: Membership) {
    this.pdfService.generateInvoice(membership);
  }
}
