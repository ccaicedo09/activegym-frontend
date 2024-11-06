import { Component, inject, OnInit } from '@angular/core';
import { ExpiringNotification } from './ExpiringNotification.interface';
import { AnalyticsService } from '../../../../services/analytics/analytics.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-bell.component.html',
  styleUrl: './notification-bell.component.css'
})
export default class NotificationBellComponent implements OnInit {
  hasNotifications = false;
  notifications: ExpiringNotification[] = [];

  private analyticsService = inject(AnalyticsService);
  private router = inject(Router);

  ngOnInit(): void {
    this.analyticsService.hasActiveNotifications().subscribe(
      has => this.hasNotifications = has
    );

    this.analyticsService.getNotifications().subscribe(
      notifications => this.notifications = notifications
    );
  }

  goToExpiringMemberships(): void {}
}
