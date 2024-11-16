import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User, UserOverview } from "../../models/users/users.interface";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  list(page: number, size: number, filters?: any): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params = params.set(key, filters[key]);
        }
      });
    }

    return this.http.get<User[]>(`${this.apiUrl}/api/users`, { params });
  }

  get(document: number) {
    return this.http.get<User>(`${this.apiUrl}/api/users/${document}`);
  }

  getSelf() {
    return this.http.get<User>(`${this.apiUrl}/api/users/self-management/get-info`);
  }

  getOverview(document: number) {
    return this.http.get<UserOverview>(`${this.apiUrl}/api/users/${document}/overview`);
  }

  getSelfOverview() {
    return this.http.get<UserOverview>(`${this.apiUrl}/api/users/self-management/overview`);
  }

  listGymTeam() {
    return this.http.get<User[]>(`${this.apiUrl}/api/users/team`);
  }

  create(formData: FormData) {
    return this.http.post<User>(`${this.apiUrl}/api/users`, formData);
  }

  updateBasicInfo(document: number, user: User) {
    return this.http.put<User>(`${this.apiUrl}/api/users/${document}`, user);
  }

  updateSelfBasicInfo(user: User) {
    return this.http.put<User>(`${this.apiUrl}/api/users/self-management/update-info`, user);
  }

  updateProfilePicture(document: number, formData: FormData) {
    return this.http.put(`${this.apiUrl}/api/users/${document}/profile-picture`, formData);
  }

  updateSelfProfilePicture(formData: FormData) {
    return this.http.put(`${this.apiUrl}/api/users/self-management/profile-picture`, formData);
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
