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
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgFor, NgIf, TranslateModule],
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
  private translate = inject(TranslateService);

  userForm!: FormGroup;
  user?: User;
  profilePicture ?: File;
  fileError : string | null = null;
  genders: Gender[] = [];
  eps: Eps[] = [];
  bloodTypes: BloodType[] = [];
  bloodRhs: BloodRh[] = [];
  isSelfManagement = false;
  isCreateMode = false;


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
      profilePicture: ['']
    });

    if (userDocument) {
      this.userService.get(parseInt(userDocument)).subscribe((user: User) => {
        this.user = user;
        console.log(user);
        this.userForm.patchValue(user);
      });
    } else if (this.router.url.includes('/profile')) {
      this.isSelfManagement = true;
      this.userService.getSelf().subscribe((user: User) => {
        this.user = user;
        this.userForm.patchValue(user);
      });
    } else {
      this.isCreateMode = true;
    }

    this.loadGenders();
    this.loadEps();
    this.loadBloodTypes();
    this.loadBloodRhs();
  }


  save() {
    if (this.userForm?.invalid || (this.isCreateMode && !this.profilePicture)) {
      this.userForm.markAllAsTouched();
      if (!this.profilePicture) {
        this.fileError = 'Debes seleccionar una foto de perfil.';
      }
      return;
    }

    const userData = this.userForm!.value;

    if (this.isCreateMode) {
      const formData = new FormData();
      formData.append('data', new Blob([JSON.stringify(userData)], { type: 'application/json' }));
      if (this.profilePicture) {
        formData.append('profile-picture', this.profilePicture);
      }

      this.userService.create(formData).subscribe(() => {
        this.router.navigate(['dashboard/users']);
      });
    } else if (this.isSelfManagement) {
      this.userService.updateSelfBasicInfo(userData).subscribe(() => {
        this.router.navigate(['dashboard/profile']);
      });
    } else {
      this.userService.updateBasicInfo(this.user!.document, userData).subscribe(() => {
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


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const maxFileSize = 2 * 1024 * 1024; // 2MB
      const allowedTypes = ['image/jpeg', 'image/png'];

      if (file.size > maxFileSize) {
        this.fileError = 'El archivo es demasiado grande. Máximo permitido: 2MB.';
        this.profilePicture = undefined;
      } else if (!allowedTypes.includes(file.type)) {
        this.fileError = 'Formato no permitido. Usa JPEG o PNG.';
        this.profilePicture = undefined;
      } else {
        // Cast the file to a webp image
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  this.fileError = null;
                  const documentValue = this.userForm.get('document')?.value;
                  const newFileName = `${documentValue || 'archivo'}_imagen.webp`;
                  this.profilePicture = new File([blob], newFileName, { type: 'image/webp' });
                } else {
                  this.fileError = 'Error al procesar la imagen.';
                  this.profilePicture = undefined;
                }
              },
              'image/webp',
              0.8 // Compression quality
            );
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
