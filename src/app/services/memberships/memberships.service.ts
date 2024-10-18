import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Membership } from '../../models/memberships/memberships.interface';
import { MembershipType } from '../../models/memberships/membershiptype.interface';

@Injectable({
  providedIn: 'root'
})
export class MembershipsService {

  private http = inject(HttpClient);

  // User memberships

  list() {
    return this.http.get<Membership[]>('http://localhost:8081/api/memberships');
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
