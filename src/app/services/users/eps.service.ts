import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Eps } from "../../models/users/eps.interface";
import { environment } from "../../../environments/environment.development";


@Injectable({
  providedIn: 'root'
})

export class EpsService {
  private http = inject(HttpClient)
  private apiUrl = environment.apiUrl;

  list() {
    return this.http.get<Eps[]>(`${this.apiUrl}/eps`)
  }

}
