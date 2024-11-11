import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../../models/users/users.interface";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  list(page: number, size: number): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<User[]>(`${this.apiUrl}/api/users`, { params });
  }

  get(document: number) {
    return this.http.get<User>(`${this.apiUrl}/api/users/${document}`);
  }

  getSelf() {
    return this.http.get<User>(`${this.apiUrl}/api/users/self-management/get-info`);
  }

  listGymTeam() {
    return this.http.get<User[]>(`${this.apiUrl}/api/users/team`);
  }

  create(user: User) {
    return this.http.post<User>(`${this.apiUrl}/api/users`, user);
  }

  updateBasicInfo(document: number, user: User) {
    return this.http.put<User>(`${this.apiUrl}/api/users/${document}`, user);
  }

  updateSelfBasicInfo(user: User) {
    return this.http.put<User>(`${this.apiUrl}/api/users/self-management/update-info`, user);
  }

  assignRole(document: number, roleName: string) {
    return this.http.post(`${this.apiUrl}/api/users/${document}/roles`, { roleName });
  }

  revokeRole(document: number, roleName: string) {
    return this.http.delete(`${this.apiUrl}/api/users/${document}/roles`, { body: { roleName } });
  }

  adminChangePassword(document: number, password: string) {
    return this.http.put(`${this.apiUrl}/api/users/${document}/change-password`, { password });
  }

}
