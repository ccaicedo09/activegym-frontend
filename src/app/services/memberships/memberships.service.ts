import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Membership } from '../../models/memberships/memberships.interface';
import { MembershipType } from '../../models/memberships/membershiptype.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MembershipTransfer } from '../../components/management/transfer-membership/membership-transfer.interface';
import { MembershipFreeze } from '../../components/management/freeze-membership/membership-freeze.interface';

@Injectable({
  providedIn: 'root'
})
export class MembershipsService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // User memberships

  list(page: number, size: number): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(`${this.apiUrl}/api/memberships`, { params });
  }

  get(document: number) {
    return this.http.get<Membership[]>(`${this.apiUrl}/api/memberships/${document}`);
  }

  getSelf() {
    return this.http.get<Membership[]>(`${this.apiUrl}/api/memberships/self-management/get-memberships`);
  }

  create(membership: Membership) {
    return this.http.post<Membership>(`${this.apiUrl}/api/memberships`, membership)
  }

  transfer(transferBody: MembershipTransfer) {
    return this.http.post(`${this.apiUrl}/api/memberships/transfer`, transferBody, { responseType: 'text' });
  }

  freeze(freezeBody: MembershipFreeze) {
    return this.http.post(`${this.apiUrl}/api/memberships/freeze`, freezeBody, { responseType: 'text' });
  }

  // Membership types

  getMembershipTypes() {
    return this.http.get<MembershipType[]>(`${this.apiUrl}/api/memberships/public/types`);
  }

  createMembershipType(membershipType: MembershipType) {
    return this.http.post<MembershipType>(`${this.apiUrl}/api/memberships/types/create`, membershipType);
  }

  updateMembershipType(membershipType: MembershipType, id: number) {
    return this.http.put<MembershipType>(`${this.apiUrl}/api/memberships/types/edit/${id}`, membershipType);
  }

  toggleMembershipTypeVisibility(id: number) {
    return this.http.patch(`${this.apiUrl}/api/memberships/types/toggle-visibility/${id}`, null);
  }

}
