import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollToTopComponent } from "./components/shared/scroll-to-top/scroll-to-top.component";
import { AlertService } from './components/shared/alert/alert.service';
import { AlertComponent } from "./components/shared/alert/alert.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ScrollToTopComponent, AlertComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'activegym-frontend';
  errorMessage: string = '';

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.error$.subscribe(message => {
      this.errorMessage = message;
    });
  }
}
