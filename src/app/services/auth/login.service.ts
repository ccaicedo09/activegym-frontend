import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { LoginRequest } from './loginRequest.interface';
import { User } from '../../models/users/users.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor(private http: HttpClient) {
    this.currentUserLogged = new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
  }

  login(credentials: LoginRequest):Observable<any> {
    return this.http.post<any>('http://localhost:8081/auth/login', credentials).pipe(
      tap(userData => {
        sessionStorage.setItem("token", userData.token);
        this.currentUserLogged.next(true);
        this.currentUserData.next(userData.token);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  logout(): void {
    sessionStorage.removeItem("token");
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
    return sessionStorage.getItem("token") || "";
  }
}
