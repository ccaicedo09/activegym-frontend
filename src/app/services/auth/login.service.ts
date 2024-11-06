import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, firstValueFrom, map, Observable, tap, throwError } from 'rxjs';
import { LoginRequest } from './loginRequest.interface';
import { environment } from '../../../environments/environment';
import { ChangePassword } from '../../components/shared/change-password/change-password.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;

  currentUserLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor(private http: HttpClient) {
    this.currentUserLogged = new BehaviorSubject<boolean>(localStorage.getItem("token")!=null);
    this.currentUserData = new BehaviorSubject<String>(localStorage.getItem("token") || "");
  }

  login(credentials: LoginRequest):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials, {withCredentials: true}).pipe(
      tap(userData => {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("userName", userData.userName);
        this.currentUserLogged.next(true);
        this.currentUserData.next(userData.token);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    this.currentUserLogged.next(false);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error("Backend retornó el código de estado ", error)
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getUserData():Observable<String> {
    return this.currentUserData.asObservable();
  }

  getUserLogged():Observable<boolean> {
    return this.currentUserLogged.asObservable();
  }

  getUserToken():String {
    return localStorage.getItem("token") || "";
  }

  validateToken(token: String): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/auth/verify-token`, { token });
  }

  getRoles():Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/auth/roles`, {withCredentials: true});
  }

  changePassword(oldPassword: string, newPassword: string):Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/users/change-password`, { oldPassword, newPassword });
  }
}
