import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BloodType } from "../models/bloodtype.interface";


@Injectable({
  providedIn: 'root'
})

export class BloodTypeService {
  private http = inject(HttpClient)

  list() {
    return this.http.get<BloodType[]>('http://localhost:8081/bloodtype')
  }

}
