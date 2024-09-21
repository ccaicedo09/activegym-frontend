import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../models/users.interface";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private http = inject(HttpClient);

  create(user: User) {
    return this.http.post<User>('http://localhost:8081/users', user);
  }
  
}
