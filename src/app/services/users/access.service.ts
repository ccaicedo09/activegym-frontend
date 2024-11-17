import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserAccess } from '../../models/users/users.interface';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAccess(document: UserAccess) {
    return this.http.post<AccessResponse>(`${this.apiUrl}/api/access`, document);
  }
}

interface AccessResponse {
  message: string;
}
