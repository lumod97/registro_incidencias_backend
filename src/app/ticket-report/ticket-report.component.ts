import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import axiosInstance from '../axios-config';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importar Router

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-ticket-report',
  standalone: true,
  templateUrl: './ticket-report.component.html',
  styleUrls: ['./ticket-report.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // BrowserAnimationsModule,
  ]
})
export class TicketReportComponent implements OnInit {
  tickets: any[] = [];
  totalRecords = 0;
  offset = 1;
  limit = 1000;
  reportForm: FormGroup;
  loading = false; // Variable para controlar el loader

  constructor(private fb: FormBuilder, private router: Router) {
    this.reportForm = this.fb.group({
      dateFrom: ['2024-10-07'],
      dateTo: ['2024-10-13']
    });
  }

  ngOnInit(): void {
    this.getTickets();
  }

  async getTickets(): Promise<void> {
    this.loading = true; // Activar loader
    const { dateFrom, dateTo } = this.reportForm.value;
    try {
      const response = await axiosInstance.post('/tickets/get-report-per-person', {
        date_from: new Date(dateFrom).toISOString().split("T")[0],
        date_to: new Date(dateTo).toISOString().split("T")[0],
        offset: this.offset,
        limit: this.limit
      });
      this.tickets = response.data;
      this.totalRecords = response.data.length; // Cambia esto si recibes información de paginación
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      this.loading = false; // Desactivar loader
    }
  }

  onSubmit(): void {
    this.getTickets();
  }

  changePage(event: any): void {
    this.offset = event.pageIndex * this.limit;
    this.getTickets();
  }

  // Método para manejar el doble clic en una fila
  onRowDoubleClick(ticketId: number): void {
    // this.router.navigate(['/detalles-ticket', ticketId]); // Navega a la ruta con el ID
    alert(ticketId)
  }
}
