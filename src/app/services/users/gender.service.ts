import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Gender } from "../../models/users/gender.interface";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})

export class GenderService {
  private http = inject(HttpClient)
  private apiUrl = environment.apiUrl;

  list() {
    return this.http.get<Gender[]>(`${this.apiUrl}/genders`);
  }

}
