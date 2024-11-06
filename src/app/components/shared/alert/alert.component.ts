import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnDestroy {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'error'; // Tipo de alerta (error o éxito)
  showAlert: boolean = false;
  isClosing: boolean = false;
  private errorSubscription: Subscription;
  private successSubscription: Subscription;

  constructor(private alertService: AlertService) {
    // Suscribirse a los mensajes de error
    this.errorSubscription = this.alertService.error$.subscribe(msg => {
      this.showAlertMessage(msg, 'error');
    });

    // Suscribirse a los mensajes de éxito
    this.successSubscription = this.alertService.success$.subscribe(msg => {
      this.showAlertMessage(msg, 'success');
    });
  }

  showAlertMessage(message: string, type: 'success' | 'error') {
    if (!this.isClosing) { // Solo mostrar si no está cerrando
      this.message = message;
      this.type = type;
      this.showAlert = true;

      setTimeout(() => {
        this.closeAlert();
      }, 5000);
    }
  }

  closeAlert() {
    this.isClosing = true;
    setTimeout(() => {
      this.showAlert = false;
      this.isClosing = false;
    }, 500);
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
    this.successSubscription.unsubscribe();
  }
}
