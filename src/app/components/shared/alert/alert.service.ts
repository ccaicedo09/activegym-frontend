import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private errorSubject = new Subject<string>();
  error$ = this.errorSubject.asObservable();

  showError(message: string) {
    this.errorSubject.next(message);
  }
}
