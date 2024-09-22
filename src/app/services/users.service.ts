import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../models/users.interface";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private http = inject(HttpClient);

  list() {
    return this.http.get<User[]>('http://localhost:8081/users');
  }

  get(document: number) {
    return this.http.get<User>(`http://localhost:8081/users/${document}`);
  }

  create(user: User) {
    return this.http.post<User>('http://localhost:8081/users', user);
  }

  update(document: number, user: User) {
    return this.http.put<User>(`http://localhost:8081/users/${document}`, user);
  }

}
