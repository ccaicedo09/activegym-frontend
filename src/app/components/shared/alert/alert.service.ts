import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private errorSubject = new Subject<string>();
  private successSubject = new Subject<string>();

  error$ = this.errorSubject.asObservable();
  success$ = this.successSubject.asObservable();

  showError(message: string) {
    this.errorSubject.next(message);
  }

  showSuccess(message: string) {
    this.successSubject.next(message);
  }
}
