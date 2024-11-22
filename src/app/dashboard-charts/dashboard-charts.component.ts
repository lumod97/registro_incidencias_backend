import { CommonModule } from '@angular/common'; // Importar CommonModule
import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Importar FormBuilder y FormGroup
import { MatTooltipModule } from '@angular/material/tooltip'; // Importar MatTooltipModule
import { Chart, ChartType, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importar el plugin
import { BaseChartDirective } from 'ng2-charts';
import axiosInstance from '../axios-config'; // Importa la configuración de Axios
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Importa el módulo de spinner

Chart.register(...registerables);
Chart.register(ChartDataLabels); // Registrar el plugin de datalabels

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, BaseChartDirective, ReactiveFormsModule, MatTooltipModule, MatTooltipModule, MatProgressSpinnerModule],
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
  monthlyValues: any[] = []; // Cambia 'any' por el tipo adecuado

  // Estado de carga inicial
  isLoading = false;

  randomValue(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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
      anio: ['2024'], // Campo para el año
      month: [''] // Campo para el mes
    });

    // Suscribirse a los cambios en el formulario
    // this.filterForm.valueChanges.subscribe(value => {
    //   // this.updateData(value.anio, value.month);
    // });
  }

  // Método asíncrono para inicializar los valores
  async initializeValues() {
    this.isLoading = false; // Mostrar loader
    try {
      const [monthlyValues, statusStats] = await Promise.all([
        this.getMonthlyValues(),
        this.getStatusStatsMonthlyValues()
      ]);
      this.monthlyValues = monthlyValues;
    } catch (error) {
      console.error('Error al inicializar valores:', error);
    } finally {
      this.isLoading = false; // Ocultar loader
    }
  }

  async getMonthlyValues(): Promise<any[]> {
    // Inicializar un arreglo vacío para los valores
    let monthlyValues: any[] = [];

    // Hacer la solicitud POST a la API
    try {
      const response = await axiosInstance.post('/tickets/get-ticket-statistics-per-month', {
        anio: parseInt(this.filterForm.value.anio, 10), // Convertir a int
        month: (this.filterForm.value.month ? this.getMonthIndex(this.filterForm.value.month) : 0) + 1
      });

      // Procesar la respuesta y convertirla al formato deseado
      monthlyValues = [
        { name: 'Bajo', value: response.data.low },
        { name: 'Medio', value: response.data.medium },
        { name: 'Alto', value: response.data.high },
        { name: 'Crítico', value: response.data.critical },
      ];

      if (this.chart) {
        this.chart.update();
      }
    } catch (error) {
      console.error('Error al obtener los valores mensuales:', error);
    }

    return monthlyValues; // Retornar los valores formateados
  }

  async getStatusStatsMonthlyValues() {
    // Inicializar un arreglo vacío para los valores
    let monthlyValues: any[] = [];

    // Hacer la solicitud POST a la API
    try {
      const response = await axiosInstance.post('/tickets/get-ticket-statistics-per-status-monthly', {
        anio: parseInt(this.filterForm.value.anio, 10), // Convertir a int
        month: (this.filterForm.value.month ? this.getMonthIndex(this.filterForm.value.month) : 0) + 1
      });

      monthlyValues = [
        { name: 'Nuevo', value: response.data.new_ticket, color: '#73fc9f', hoverColor: '#54b77d' },
        { name: 'Asignado', value: response.data.assigned, color: '#73d1fc', hoverColor: '#55a4d6' },
        { name: 'En curso', value: response.data.in_course, color: '#9e73fc', hoverColor: '#8b5bc6' },
        { name: 'Pendiente', value: response.data.pending, color: '#fc9e73', hoverColor: '#d98b54' },
        { name: 'Resuelto', value: response.data.solved, color: '#aefc73', hoverColor: '#8cbd54' },
        { name: 'Cerrado', value: response.data.closed, color: '#fc738c', hoverColor: '#d86e7e' },
        { name: 'Cancelado', value: response.data.canceled, color: '#dc143c', hoverColor: '#b80f30' },
      ];

      // Actualizar los datos del gráfico
      this.chartData.datasets[0].data = monthlyValues.map(item => item.value); // Asigna solo los valores al gráfico
      this.chartData.labels = monthlyValues.map(item => item.name); // Asigna solo los valores al gráfico
      this.chartData.datasets[0].backgroundColor = monthlyValues.map(item => item.color); // Asigna solo los valores al gráfico
      this.chartData.datasets[0].hoverBackgroundColor = monthlyValues.map(item => item.hoverColor); // Asigna solo los valores al gráfico
      console.log(response)
      if (this.chart) {
        this.chart.update();
      }
    } catch (error) {
      console.error('Error al obtener los valores mensuales:', error);
    }
  }

  // Propiedad para las torres
  torres = [
    { name: 'Torre 1', dev: 10, qa: 5, prod: 3, total: 18 },
    { name: 'Torre 2', dev: 8, qa: 6, prod: 2, total: 16 },
    { name: 'Torre 3', dev: 5, qa: 7, prod: 4, total: 16 },
    { name: 'Torre 4', dev: 12, qa: 3, prod: 5, total: 20 },
    { name: 'Torre 5', dev: 6, qa: 9, prod: 7, total: 22 },
    { name: 'Torre 6', dev: 7, qa: 4, prod: 6, total: 17 },
    { name: 'Torre 7', dev: 9, qa: 2, prod: 3, total: 14 },
    { name: 'Torre 8', dev: 11, qa: 8, prod: 9, total: 28 },
    { name: 'Torre 9', dev: 4, qa: 5, prod: 4, total: 13 }
  ];
  
  getMonthIndex(month: string): number {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months.indexOf(month);
  }

  // Método para actualizar el gráfico
  // No es necesario el método updateData en esta versión

  // Llamado a la inicialización al cargar el componente
  ngOnInit() {
    this.initializeValues();
  }

}
