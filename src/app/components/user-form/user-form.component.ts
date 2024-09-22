import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/users.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../models/users.interface';
import { GenderService } from '../../services/gender.service';
import { EpsService } from '../../services/eps.service';
import { BloodTypeService } from '../../services/bloodtype.service';
import { BloodRhService } from '../../services/bloodrh.service';
import { Gender } from '../../models/gender.interface';
import { Eps } from '../../models/eps.interface';
import { BloodType } from '../../models/bloodtype.interface';
import { BloodRh } from '../../models/bloodrh.interface';
import { NgFor, NgIf } from '@angular/common';
import { ageValidator } from '../../validators/ageValidator';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export default class UserFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private genderService = inject(GenderService);
  private epsService = inject(EpsService);
  private bloodTypeService = inject(BloodTypeService);
  private bloodRhService = inject(BloodRhService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  userForm!: FormGroup;
  user?: User;
  genders: Gender[] = [];
  eps: Eps[] = [];
  bloodTypes: BloodType[] = [];
  bloodRhs: BloodRh[] = [];

  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(7)]],
      email: ['', [Validators.required, Validators.email]],
      document: ['', [Validators.required, Validators.minLength(9)]],
      dateOfBirth: ['', [Validators.required, ageValidator(15)]],
      gender: ['', [Validators.required]],
      eps: ['', [Validators.required]],
      bloodType: ['', [Validators.required]],
      bloodRh: ['', [Validators.required]],
    });
    this.loadGenders();
    this.loadEps();
    this.loadBloodTypes();
    this.loadBloodRhs();
  }


  save() {
    if(this.userForm?.invalid) {
      this.userForm.markAllAsTouched()
      return;
    }

    const userData = this.userForm!.value;
    console.log('Datos enviados:', userData);

    this.userService.create(userData)
    .subscribe(() => {
      this.router.navigate(['dashboard']);
    })
  }

  loadGenders() {
    this.genderService.list()
    .subscribe((genders) => {
      this.genders = genders;
    });
  }

  loadEps() {
    this.epsService.list()
    .subscribe((eps) => {
      this.eps = eps;
    });
  }

  loadBloodTypes() {
    this.bloodTypeService.list()
    .subscribe((bloodTypes) => {
      this.bloodTypes = bloodTypes;
    });
  }

  loadBloodRhs() {
    this.bloodRhService.list()
    .subscribe((bloodRhs) => {
      this.bloodRhs = bloodRhs;
    });
  }

}
