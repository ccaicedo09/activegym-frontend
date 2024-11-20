import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MembershipsService } from '../../../services/memberships/memberships.service';
import { MembershipType } from '../../../models/memberships/membershiptype.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-membership-type-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './membership-type-form.component.html',
  styleUrl: './membership-type-form.component.css'
})
export default class MembershipTypeFormComponent implements OnInit, OnChanges{

  private membershipService = inject(MembershipsService);
  private formBuilder = inject(FormBuilder);

  @Input() membershipType: MembershipType | null = null;
  inputs: Array<{ value: string}> = [];
  membershipTypeForm !: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['membershipType']) {
      const membershipType = changes['membershipType'].currentValue;
      if (membershipType) {
        this.updateForm(membershipType);
      } else {
        if (this.membershipTypeForm) {
          this.membershipTypeForm.reset();
          this.inputs = [];
        }
      }
    }
  }

  private initForm(): void {
    this.membershipTypeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      description: [''],
      isTransferable: [false, [Validators.required]],
      isFreezable: [false, [Validators.required]],
    });
  }

  private updateForm(membershipType: MembershipType): void {
    this.membershipTypeForm.patchValue(membershipType);
    this.inputs = this.parseDescription(membershipType.description);
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
      description: formattedDescription,
      isVisible: this.membershipType ? this.membershipType.isVisible : true
    };

    if (this.membershipType) {
      this.membershipService.updateMembershipType(membershipTypeData, this.membershipType.id).subscribe({
        next: () => {
          console.log("Membership type updated successfully");
          location.reload();
        },
        error: (e) => {
          console.error("Error updating membership type", e)
        }
      });
    } else {
      this.membershipService.createMembershipType(membershipTypeData).subscribe({
        next: () => {
          console.log("Membership type created successfully");
          location.reload();
        },
        error: (e) => {
          console.log(membershipTypeData);
          console.error("Error creating membership type", e)
        }
      });
    }
  }

  parseDescription(description: string): { value: string }[] {
    return description.split('-').filter(desc => desc).map(desc => ({ value: desc.trim() }));
  }
}
