import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BloodType } from "../../models/users/bloodtype.interface";
import { environment } from "../../../environments/environment.development";


@Injectable({
  providedIn: 'root'
})

export class BloodTypeService {
  private http = inject(HttpClient)
  private apiUrl = environment.apiUrl;

  list() {
    return this.http.get<BloodType[]>(`${this.apiUrl}/bloodtype`);
  }

}
