import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [],
  templateUrl: './metric-card.component.html',
  styleUrl: './metric-card.component.css'
})
export default class MetricCardComponent {
  @Input() title !: string;
  @Input() icon !: string;
  @Input() value !: number | string;
}
