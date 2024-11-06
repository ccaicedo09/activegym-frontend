import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { TopSoldMemberships } from './top-sold-memberships.interface';
import { ExpiringNotification } from '../../components/shared/dashboard-upper-nav/notification-bell/ExpiringNotification.interface';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private lastCheckDate: string | null = null;
  private hasNotifications = new BehaviorSubject<boolean>(false);
  private notifications = new BehaviorSubject<ExpiringNotification[]>([]);

  getTotalSales(month: number, year: number): Observable<number> {
    const params = new HttpParams()
      .set('month', month.toString())
      .set('year', year.toString());
    return this.http.get<number>(`${this.apiUrl}/api/memberships/total-sales`, { params });
  }

  getTotalEarnings(month: number, year: number): Observable<number> {
    const params = new HttpParams()
      .set('month', month.toString())
      .set('year', year.toString());
    return this.http.get<number>(`${this.apiUrl}/api/memberships/total-earnings`, { params });
  }

  getTopSoldMemberships(month: number, year: number): Observable<TopSoldMemberships[]> {
    const params = new HttpParams()
      .set('month', month.toString())
      .set('year', year.toString());
    return this.http.get<TopSoldMemberships[]>(`${this.apiUrl}/api/memberships/top-sold`, { params });
  }

  getActiveUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/api/memberships/active-count`);
  }

  getRecentUsersCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/api/users/recent-count`);
  }


  // Expiring memberships notifications
  getExpiringMemberships():Observable<ExpiringNotification[]>{
    const today = new Date().toDateString();
    if(this.lastCheckDate === today){
      return this.notifications.asObservable();
    }
    this.http.get<ExpiringNotification[]>(`${this.apiUrl}/api/memberships/notifications/expiring`).subscribe(
      (data) => {
        this.lastCheckDate = today;
        this.notifications.next(data);
        this.hasNotifications.next(data.length > 0);
      },
      (error) => {
        console.error(error);
      }
    );
    return this.notifications.asObservable();
  }

  hasActiveNotifications(): Observable<boolean> {
    return this.hasNotifications.asObservable();
  }

  getNotifications(): Observable<ExpiringNotification[]> {
    return this.notifications.asObservable();
  }

}
