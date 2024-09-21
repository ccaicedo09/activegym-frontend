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
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgFor],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export default class CreateUserComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private genderService = inject(GenderService);
  private epsService = inject(EpsService);
  private bloodTypeService = inject(BloodTypeService);
  private bloodRhService = inject(BloodRhService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form!: FormGroup;
  user?: User;
  genders: Gender[] = [];
  eps: Eps[] = [];
  bloodTypes: BloodType[] = [];
  bloodRhs: BloodRh[] = [];

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      document: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
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
    if(this.form?.invalid) {
      this.form.markAllAsTouched()
      return;
    }

    const userForm = this.form!.value;

    this.userService.create(userForm)
    .subscribe(() => {
      this.router.navigate(['/']);
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
