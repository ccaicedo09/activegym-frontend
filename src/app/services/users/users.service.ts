import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../../models/users/users.interface";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private http = inject(HttpClient);

  list() {
    return this.http.get<User[]>('http://localhost:8081/api/users');
  }

  get(document: number) {
    return this.http.get<User>(`http://localhost:8081/api/users/${document}`);
  }

  create(user: User) {
    return this.http.post<User>('http://localhost:8081/api/users', user);
  }

  updateBasicInfo(document: number, user: User) {
    return this.http.put<User>(`http://localhost:8081/api/users/${document}`, user);
  }

}
