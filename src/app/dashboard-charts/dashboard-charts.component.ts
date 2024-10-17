import { Component, ViewChild } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importar el plugin
import { BaseChartDirective } from 'ng2-charts';
import { FormBuilder, FormGroup } from '@angular/forms'; // Importar FormBuilder y FormGroup
import { ReactiveFormsModule } from '@angular/forms';


Chart.register(...registerables);
Chart.register(ChartDataLabels); // Registrar el plugin de datalabels

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, ReactiveFormsModule],
  templateUrl: './dashboard-charts.component.html',
  styleUrls: ['./dashboard-charts.component.css']
})
export class DashboardChartsComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective; // Propiedad para el gráfico
  filterForm: FormGroup;
  
  items = [
    { title: 'ADMIN..', percentage: 0.00 },
    { title: 'CRÉDITOS', percentage: 100.00 },
    { title: 'CANALES', percentage: 100.00 },
    { title: 'COBRANZAS', percentage: 85.00 },
    { title: 'INNOVACIÓN', percentage: 90.00 },
    { title: 'NEGOCIOS', percentage: 60.00 },
    { title: 'NORMATIVOS', percentage: 9.09 },
    { title: 'PRODUCTOS', percentage: 100.00 },
    { title: 'TECNOLOGÍA', percentage: 5.00 },
  ];

  // Propiedad values
  values: any[] = []; // Cambia 'any' por el tipo adecuado

  // Datos del gráfico
  chartLabels: string[] = ['Atendidas', 'En Proceso', 'Pendientes'];
  chartData = {
    labels: this.chartLabels,
    datasets: [
      {
        data: [63, 17, 20], // Valores de los datos iniciales
        backgroundColor: ['#34eb93', '#3495eb', '#eb7d34'], // Colores opcionales
        hoverBackgroundColor: ['#34eb93', '#3495eb', '#eb7d34'],
      }
    ]
  };

  getBackgroundColor(percentage: number): string {
    if (percentage < 30) {
      return '#f02e3e'; // Color para porcentajes menores a 30
    } else if (percentage < 75) {
      return '#f0a01f'; // Color para porcentajes menores a 75
    } else {
      return '#2bbf1b'; // Color para porcentajes 75 o mayores
    }
  }

  currentMonth: string = new Date().toLocaleString('default', { month: 'long' }).toUpperCase();
  chartType: ChartType = 'pie'; // Tipo de gráfico

  constructor(private fb: FormBuilder) {
    // Inicializar el formulario
    this.filterForm = this.fb.group({
      year: [''], // Campo para el año
      month: [''] // Campo para el mes
    });

    // Inicializar values
    this.values = this.getValues();

    // Suscribirse a los cambios en el formulario
    this.filterForm.valueChanges.subscribe(value => {
      this.updateData(value.year, value.month);
    });
  }

  // Método para obtener los valores
  getValues(): any[] {
    return [
      { name: 'Item 1', value: 56 },
      { name: 'Item 2', value: 152 },
      { name: 'Item 3', value: 134 },
      { name: 'Item 4', value: 73 },
      { name: 'Item 5', value: 251 },
      { name: 'Item 6', value: 196 },
    ];
  }

  // Método para actualizar los datos y el mes actual basado en la selección
  updateData(year: string, month: string) {
    console.log('Updating data for:', year, month); // Verifica los valores
    this.currentMonth = month || new Date().toLocaleString('default', { month: 'long' }).toUpperCase();
    const monthIndex = month ? this.getMonthIndex(month) : 0; 
    this.chartData.datasets[0].data = this.getDataForMonth(monthIndex);
  
    if (this.chart) {
      this.chart.update(); 
    }
  }
  

  // Método para obtener el índice del mes
  getMonthIndex(month: string): number {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months.indexOf(month);
  }

  // Método para obtener datos en función del mes
  getDataForMonth(monthIndex: number): number[] {
    const data = [
      [63, 17, 20], // Enero
      [50, 30, 20], // Febrero
      [70, 20, 10], // Marzo
      [80, 10, 10], // Abril
      [40, 30, 30], // Mayo
      [90, 5, 5],   // Junio
      [60, 20, 20], // Julio
      [75, 15, 10], // Agosto
      [55, 25, 20], // Septiembre
      [85, 10, 5],  // Octubre
      [95, 3, 2],   // Noviembre
      [100, 0, 0],  // Diciembre
    ];
    console.log('Data for month index', monthIndex, 'is', data[monthIndex]); // Verifica los datos
    return data[monthIndex] || data[0]; 
  }
  
}
