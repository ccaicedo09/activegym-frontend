import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BloodRh } from "../../models/users/bloodrh.interface";
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})

export class BloodRhService {
  private http = inject(HttpClient)
  private apiUrl = environment.apiUrl;

  list() {
    return this.http.get<BloodRh[]>(`${this.apiUrl}/bloodrh`);
  }

}
