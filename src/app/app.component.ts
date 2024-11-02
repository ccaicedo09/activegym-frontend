import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollToTopComponent } from "./components/shared/scroll-to-top/scroll-to-top.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ScrollToTopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'activegym-frontend';
}
