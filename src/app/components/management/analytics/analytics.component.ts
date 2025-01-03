import { Component, inject, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType, registerables } from 'chart.js';
import MetricCardComponent from "./metric-card/metric-card.component";
import { AnalyticsService } from '../../../services/analytics/analytics.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [MetricCardComponent, ReactiveFormsModule, CommonModule, MatTooltip, TranslateModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export default class AnalyticsComponent implements OnInit {

  constructor() {
    Chart.register(...registerables);
  }

  private analyticsService = inject(AnalyticsService);
  private formBuilder = inject(FormBuilder);
  private translate = inject(TranslateService);

  totalSales: number = 0;
  totalEarnings: string = '';
  activeUsers: number = 0;
  recentUsers: number = 0;
  chart: any;
  lineChart: any;
  dateForm !: FormGroup;

  months = [
    { value: 1, name: this.translate.instant('analytics.january') },
    { value: 2, name: this.translate.instant('analytics.february') },
    { value: 3, name: this.translate.instant('analytics.march') },
    { value: 4, name: this.translate.instant('analytics.april') },
    { value: 5, name: this.translate.instant('analytics.may') },
    { value: 6, name: this.translate.instant('analytics.june') },
    { value: 7, name: this.translate.instant('analytics.july') },
    { value: 8, name: this.translate.instant('analytics.august') },
    { value: 9, name: this.translate.instant('analytics.september') },
    { value: 10, name: this.translate.instant('analytics.october') },
    { value: 11, name: this.translate.instant('analytics.november') },
    { value: 12, name: this.translate.instant('analytics.december') }
  ];

  ngOnInit(): void {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    this.dateForm = this.formBuilder.group({
      month: [month],
      year: [year]
    });

    this.updateMetrics();
  }

  updateMetrics(): void {
    const { month, year } = this.dateForm.value;

    this.analyticsService.getTotalSales(month, year).subscribe(
      (data: number) => this.totalSales = data,
      (error) => console.error(error)
    );

    this.analyticsService.getTotalEarnings(month, year).subscribe(
      (data: number) => this.totalEarnings = this.formatCurrency(data),
      (error) => console.error(error)
    );

    this.analyticsService.getActiveUsers().subscribe(
      (data: number) => this.activeUsers = data,
      (error) => console.error(error)
    );

    this.analyticsService.getRecentUsersCount().subscribe(
      (data: number) => this.recentUsers = data,
      (error) => console.error(error)
    );

    // Pie chart
    this.analyticsService.getTopSoldMemberships(month, year).subscribe(data => {
      // Sort and select top 5 memberships
      const topMemberships = data.sort((a, b) => b.count - a.count).slice(0, 5);
      const labels = topMemberships.map(m => m.membershipTypeName);
      const counts = topMemberships.map(m => m.count);

      if (this.chart) {
        this.chart.destroy();
      }

      // Create the chart
      this.chart = new Chart('membershipChart', {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: counts,
            backgroundColor: ['#FFD700', '#FFA500', '#FFC107', '#FFD27F', '#FFF4CC'],
            hoverBackgroundColor: ['#FFC107', '#FF9800', '#FFB300', '#FFD700', '#FFECB3']
          }]
        },
        options: {
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                color: '#fff',
                font: {
                  family: 'Montserrat',
                  size: 12
                }
              }
            },
            title: {
              display: true,
              text: 'Membresías más vendidas',
              color: '#fff',
              font: {
                family: 'Montserrat',
                size: 16,
                weight: 'bold'
              },
              padding: {
                top: 10,
                bottom: 30
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    });

    // Line chart - GENERIC
    this.lineChart = new Chart('concurrencyChart', {
      type: 'line',
      data: {
        labels: ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
        datasets: [{
          label: 'Ingresos',
          data: [50, 40, 60, 55, 70, 85, 75, 60, 50],
          borderColor: '#FFA500',
          backgroundColor: 'rgba(255, 165, 0, 0.1)',
          fill: true,
          tension: 0.3,
          pointBackgroundColor: '#FFA500'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: '#fff',
              font: {
                family: 'Montserrat',
                size: 12
              }
            }
          },
          title: {
            display: true,
            text: 'Concurrencia del día',
            color: '#fff',
            font: {
              family: 'Montserrat',
              size: 16,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 30
            }
          }
        },
        scales: {
          x: { ticks: { color: '#FFF' } },
          y: { ticks: { color: '#FFF' } }
        }
      }
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
  }
}
