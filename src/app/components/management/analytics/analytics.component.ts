import { Component, inject, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType, registerables } from 'chart.js';
import MetricCardComponent from "./metric-card/metric-card.component";
import { AnalyticsService } from '../../../services/analytics/analytics.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [MetricCardComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export default class AnalyticsComponent implements OnInit{

  constructor() {
    Chart.register(...registerables);
  }

  private analyticsService = inject(AnalyticsService);

  totalSales: number = 0;
  totalEarnings: string = '';
  activeUsers: number = 0;
  recentUsers: number = 0;
  chart: any;
  lineChart: any;

  ngOnInit(): void {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    this.analyticsService.getTotalSales(currentMonth, currentYear).subscribe(
      (data: number) => this.totalSales = data,
      (error) => console.error(error)
    );

    this.analyticsService.getTotalEarnings(currentMonth, currentYear).subscribe(
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
    this.analyticsService.getTopSoldMemberships(currentMonth, currentYear).subscribe(data => {
      // Sort and select top 5 memberships
      const topMemberships = data.sort((a, b) => b.count - a.count).slice(0, 5);
      const labels = topMemberships.map(m => m.membershipTypeName);
      const counts = topMemberships.map(m => m.count);

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
