import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BloodRh } from "../models/bloodrh.interface";


@Injectable({
  providedIn: 'root'
})

export class BloodRhService {
  private http = inject(HttpClient)

  list() {
    return this.http.get<BloodRh[]>('http://localhost:8081/bloodrh')
  }

}
