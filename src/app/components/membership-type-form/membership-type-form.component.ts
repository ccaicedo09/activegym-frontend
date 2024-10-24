import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MembershipsService } from '../../services/memberships/memberships.service';

@Component({
  selector: 'app-membership-type-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './membership-type-form.component.html',
  styleUrl: './membership-type-form.component.css'
})
export default class MembershipTypeFormComponent {

  private membershipService = inject(MembershipsService);
  private formBuilder = inject(FormBuilder);

  inputs: Array<{ value: string}> = [];
  membershipTypeForm !: FormGroup;

  constructor() {
    this.membershipTypeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      description: [''],
      isTransferable: [false, [Validators.required]],
      isFreezable: [false, [Validators.required]],
    })
  }

  addFeature() {
    this.inputs.push({ value: '' });
  }

  deleteFeature(index: number) {
    this.inputs.splice(index, 1);
  }

  save() {
    if (this.membershipTypeForm?.invalid) {
      this.membershipTypeForm.markAllAsTouched();
      return;
    }

    const formattedDescription = this.inputs.map(input => `-${input.value}`).join(' ');
    const membershipTypeData = {
      ...this.membershipTypeForm.value,
      description: formattedDescription
    }

    this.membershipService.createMembershipType(membershipTypeData).subscribe({
      next: () => {
        console.log("Membership type created successfully");
        console.log(membershipTypeData);
        console.log(this.inputs)
      },
      error: (e) => {
        console.log(membershipTypeData);
        console.error("Error creating membership type", e)
      }
    });
  }
}
