import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TopSoldMemberships } from './top-sold-memberships.interface';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

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

}
