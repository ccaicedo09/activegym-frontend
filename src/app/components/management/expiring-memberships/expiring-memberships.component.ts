import { Component, inject, Input, OnInit } from '@angular/core';
import { ExpiringNotification } from '../../shared/dashboard-upper-nav/notification-bell/ExpiringNotification.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expiring-memberships',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expiring-memberships.component.html',
  styleUrl: './expiring-memberships.component.css'
})
export default class ExpiringMembershipsComponent implements OnInit {

  memberships: ExpiringNotification[] = [];

  private router = inject(Router)

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    this.memberships = navigation?.extras.state?.['memberships'] || [];
  }

  ngOnInit(): void {
  }

  getWhatsAppLink(membership: ExpiringNotification): string {
    const phone = membership.userPhone.replace(/\D/g, '');
    const message = `¡Hola, ${membership.userNames}!, tu plan de Active Gym *${membership.membershipTypeName}* va a expirar el *${new Date(membership.endDate).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' })}*. Por favor, contacta con nosotros para más información.`;
    return `https://wa.me/+57${phone}?text=${encodeURIComponent(message)}`;
  }
}
