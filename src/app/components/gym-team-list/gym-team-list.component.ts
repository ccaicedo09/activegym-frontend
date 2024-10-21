import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/users/users.service';
import { User } from '../../models/users/users.interface';
import { CommonModule } from '@angular/common';
import { TooltipPosition, MatTooltipModule } from '@angular/material/tooltip';
import { RoleAssignmentComponent } from "../role-assignment/role-assignment.component";


@Component({
  selector: 'app-gym-team-list',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, RoleAssignmentComponent],
  templateUrl: './gym-team-list.component.html',
  styleUrl: './gym-team-list.component.css'
})
export default class GymTeamListComponent implements OnInit {

  private userService = inject(UserService);

  admins: User[] = [];
  advisors: User[] = [];
  trainers: User[] = [];
  cleaningStaff: User[] = [];

  selectedRole: string = '';
  showModal: boolean = false;

  ngOnInit():void {
    this.loadGymTeam();
  }

  loadGymTeam() {
    this.userService.listGymTeam().subscribe((users) => {
      this.admins = users.filter((user) => this.hasRole(user, 'ADMINISTRADOR'));
      this.advisors = users.filter((user) => this.hasRole(user, 'ASESOR'));
      this.trainers = users.filter((user) => this.hasRole(user, 'ENTRENADOR'));
      this.cleaningStaff = users.filter((user) => this.hasRole(user, 'PERSONAL DE ASEO'));
    });
  }

  hasRole(user: User, role: string): boolean {
    return user.roles.includes(role);
  }

  openModal(role: string) {
    this.selectedRole = role;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onRoleAssigned() {
    this.loadGymTeam(); // Recarga la lista de usuarios después de asignar un rol
  }

  revokeRole(document: number, roleName: string) {
    const confirmed = window.confirm(`¿Estás seguro de que deseas revocar el rol "${roleName}" para el usuario con documento ${document}?`);
    if (confirmed) {
        this.userService.revokeRole(document, roleName).subscribe(() => {
          this.loadGymTeam(); // Recarga la lista de usuarios después de revocar un rol
        });
      }
    }
}
