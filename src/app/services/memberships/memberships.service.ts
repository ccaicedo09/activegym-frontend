import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Membership } from '../../models/memberships/memberships.interface';
import { MembershipType } from '../../models/memberships/membershiptype.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembershipsService {

  private http = inject(HttpClient);

  // User memberships

  list(page: number, size: number): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>('http://localhost:8081/api/memberships', { params });
  }

  get(document: number) {
    return this.http.get<Membership[]>(`http://localhost:8081/api/memberships/${document}`);
  }

  create(membership: Membership) {
    return this.http.post<Membership>(`http://localhost:8081/api/memberships`, membership)
  }

  // Membership types

  getMembershipTypes() {
    return this.http.get<MembershipType[]>('http://localhost:8081/api/memberships/public/types');
  }

}
