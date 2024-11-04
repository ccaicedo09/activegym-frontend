import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnDestroy{
  @Input() message: string = '';
  showAlert: boolean = false;
  isClosing: boolean = false;
  private subscription: Subscription;

  constructor(private alertService: AlertService) {
    this.subscription = this.alertService.error$.subscribe(msg => {
      if (!this.isClosing) { // Solo mostrar si no está cerrando
        this.message = msg;
        this.showAlert = true; // Muestra la alerta
      }
    });
  }

  closeAlert() {
    this.isClosing = true;
    setTimeout(() => {
      this.showAlert = false;
      this.isClosing = false;
    }, 500);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
