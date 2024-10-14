import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Eps } from "../../models/users/eps.interface";


@Injectable({
  providedIn: 'root'
})

export class EpsService {
  private http = inject(HttpClient)

  list() {
    return this.http.get<Eps[]>('http://localhost:8081/eps')
  }

}
