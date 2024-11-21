import { Component, inject, OnInit } from '@angular/core';
import { MembershipsService } from '../../../services/memberships/memberships.service';
import { MembershipType } from '../../../models/memberships/membershiptype.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { dateValidator } from '../../../validators/dateValidator';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-membership-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './membership-form.component.html',
  styleUrl: './membership-form.component.css'
})
export default class MembershipFormComponent implements OnInit {

  private membershipService = inject(MembershipsService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  membershipTypes: MembershipType[] = []
  membershipForm !: FormGroup;

  ngOnInit(): void {
    const userDocument = this.route.snapshot.paramMap.get('document');
    this.loadMembershipTypes();
    this.membershipForm = this.formBuilder.group({
      startDate: ['', [Validators.required, dateValidator()]],
      membershipType: ['', [Validators.required]],
      userDocument: [userDocument]
    });
  }

  loadMembershipTypes() {
    this.membershipService.getMembershipTypes()
      .subscribe((membershipTypes) => {
        this.membershipTypes = membershipTypes.filter(type => type.isVisible);
      });
  }

  save() {
    if(this.membershipForm?.invalid) {
      this.membershipForm.markAllAsTouched();
      return;
    }
    const membershipData = this.membershipForm.value;
    this.membershipService.create(membershipData).subscribe({
      next: () => {
        console.log("Membership created successfully");
        location.reload();
      },
      error: (err) => console.error("Error al crear la membresía", err)
    })
  }
}
