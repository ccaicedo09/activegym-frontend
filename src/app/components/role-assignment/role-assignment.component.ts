import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-role-assignment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './role-assignment.component.html',
  styleUrl: './role-assignment.component.css'
})
export class RoleAssignmentComponent {
  @Input() role: string = '';
  @Output() closeModal = new EventEmitter<void>();
  @Output() roleAssigned = new EventEmitter<void>();

  private userService = inject(UserService);

  document: number | null = null; // For avoiding the 0 value on the form at the beginning
  userFound: any = null;
  isLoading: boolean = false;


  searchUser() {
    this.isLoading = true;
    if (this.document !== null) {
      this.userService.get(this.document).subscribe({
        next: (user: any) => {
          if (user.roles.includes(this.role)) {
            alert('El usuario ya tiene asignado el rol');
            this.userFound = null;
            this.isLoading = false;
          } else {
            this.userFound = user;
            this.isLoading = false;
          }
        },
        error: () => {
          this.userFound = null;
          this.isLoading = false;
        },
      });
    }
  }

  confirmRoleAssignment() {
    if (this.userFound) {
      this.userService.assignRole(this.userFound.document, this.role).subscribe(() => {
        this.roleAssigned.emit(); // Notifica que se asignó el rol
        this.closeModal.emit(); // Cierra el modal
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.document = 0;
    this.userFound = null;
  }
}
