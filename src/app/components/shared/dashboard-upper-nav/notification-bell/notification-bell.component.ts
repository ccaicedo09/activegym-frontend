import { Component, inject, OnInit } from '@angular/core';
import { ExpiringNotification } from './ExpiringNotification.interface';
import { AnalyticsService } from '../../../../services/analytics/analytics.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { state } from '@angular/animations';
import ExpiringMembershipsComponent from "../../../management/expiring-memberships/expiring-memberships.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './notification-bell.component.html',
  styleUrl: './notification-bell.component.css'
})
export default class NotificationBellComponent implements OnInit {
  hasNotifications = false;
  notifications: number = 0;
  expiringMemberships: ExpiringNotification[] = [];

  private analyticsService = inject(AnalyticsService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getExpiringMemberships();
  }

  getExpiringMemberships(): void {
    this.analyticsService.getExpiringMemberships().subscribe((notifications: ExpiringNotification[]) => {
      this.expiringMemberships = notifications;
      this.notifications = notifications.length;
      this.hasNotifications = this.notifications > 0;
    });
  }

  navigateToExpiringMemberships(): void {
    this.router.navigate(['dashboard/expiring-memberships'], {
      state: { memberships: this.expiringMemberships }
    });
  }
}
