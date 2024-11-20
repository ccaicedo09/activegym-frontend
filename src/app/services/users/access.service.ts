import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserAccess } from '../../models/users/users.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAccess(document: UserAccess) {
    return this.http.post<AccessResponse>(`${this.apiUrl}/api/access`, document);
  }

  getAccessLogs(page: number, size: number): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<UserAccessRespose[]>(`${this.apiUrl}/api/access`, { params });
  }

  getAccessLogsdByDocument(document: string, page: number, size: number): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<UserAccessRespose[]>(`${this.apiUrl}/api/access/${document}`, { params });
  }
}

interface AccessResponse {
  message: string;
}

export interface UserAccessRespose {
  id: number;
  accessDateTime: string;
  success: boolean;
  userDocument: string;
}
