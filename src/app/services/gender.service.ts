import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Gender } from "../models/gender.interface";


@Injectable({
  providedIn: 'root'
})

export class GenderService {
  private http = inject(HttpClient)

  list() {
    return this.http.get<Gender[]>('http://localhost:8081/genders')
  }

}
