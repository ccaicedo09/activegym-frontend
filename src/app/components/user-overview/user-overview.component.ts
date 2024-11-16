import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/users/users.service';
import { UserOverview } from '../../models/users/users.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-overview.component.html',
  styleUrl: './user-overview.component.css'
})
export default class UserOverviewComponent implements OnInit {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  overview: UserOverview | undefined;
  fileError: string | null = null;
  profilePicture: File | undefined;
  isUploading = false;
  userDocument: number | undefined;
  isSelfManagement = false;

  isMember(): boolean {
    return this.overview?.roles.length === 1 && this.overview.roles.includes('MIEMBRO') || false;
  }

  hasMembershipActive(): boolean {
    return this.overview?.hasMembership || false;
  }

  ngOnInit() {
    const userDocument = Number(this.route.snapshot.paramMap.get('document'));
    if (userDocument) {
      this.userDocument = userDocument;
      this.loadOverview(userDocument);
    } else if (this.router.url.includes('/profile')) {
      this.isSelfManagement = true;
      this.loadSelfOverview();
    }
  }

  loadOverview(document: number) {
    this.userService.getOverview(document).subscribe(
      (overview) => {
        this.overview = overview;
      },
      (error) => {
        console.error("Error al cargar la información del usuario: ", error);
      }
    );
  }

  loadSelfOverview() {
    this.userService.getSelfOverview().subscribe(
      (overview) => {
        this.overview = overview;
      },
      (error) => {
        console.error('Error al cargar la información del usuario:', error);
      }
    );
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
                  const newFileName = `${this.userDocument || 'archivo'}_imagen.webp`;
                  this.profilePicture = new File([blob], newFileName, { type: 'image/webp' });
                  this.uploadProfilePicture();
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

  uploadProfilePicture(): void {

    if (!this.userDocument && !this.isSelfManagement) {
      this.fileError = 'Error: No se pudo identificar el usuario.';
      return;
    }

    if (this.profilePicture) {
      this.isUploading = true;
      const formData = new FormData();
      formData.append('profile-picture', this.profilePicture);

      const uploadRequest = this.isSelfManagement ? this.userService.updateSelfProfilePicture(formData) : this.userService.updateProfilePicture(this.userDocument!, formData);

      uploadRequest.subscribe({
        next: () => {
          location.reload();
          this.isUploading = false;
          this.profilePicture = undefined;
        },
        error: (error) => {
          console.error('Error al actualizar la foto de perfil:', error);
          this.fileError = 'Error al subir la imagen. Por favor, intenta nuevamente.';
          this.isUploading = false;
        }
      });
    }
  }
}
