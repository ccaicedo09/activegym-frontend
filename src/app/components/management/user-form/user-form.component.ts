import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../../models/users/users.interface';
import { Gender } from '../../../models/users/gender.interface';
import { Eps } from '../../../models/users/eps.interface';
import { BloodType } from '../../../models/users/bloodtype.interface';
import { BloodRh } from '../../../models/users/bloodrh.interface';
import { NgFor, NgIf } from '@angular/common';
import { ageValidator } from '../../../validators/ageValidator';
import { UserService } from '../../../services/users/users.service';
import { GenderService } from '../../../services/users/gender.service';
import { EpsService } from '../../../services/users/eps.service';
import { BloodTypeService } from '../../../services/users/bloodtype.service';
import { BloodRhService } from '../../../services/users/bloodrh.service';

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
    const userDocument = this.route.snapshot.paramMap.get('document');

    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      document: ['', [Validators.required, Validators.minLength(5)]],
      dateOfBirth: ['', [Validators.required, ageValidator(15)]],
      genderName: ['', [Validators.required]],
      epsName: ['', [Validators.required]],
      bloodTypeName: ['', [Validators.required]],
      bloodRhName: ['', [Validators.required]],
    });

    if (userDocument) {
      this.userService.get(parseInt(userDocument)).subscribe((user: User) => {
        this.user = user;
        console.log(user);
        this.userForm.patchValue(user);
      });
    }

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

    if (this.user) {
      this.userService.updateBasicInfo(this.user.document, userData)
      .subscribe(() => {
        this.router.navigate(['dashboard/users']);
      });
    } else {
      this.userService.create(userData)
      .subscribe(() => {
        this.router.navigate(['dashboard/users']);
      });
    }
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
