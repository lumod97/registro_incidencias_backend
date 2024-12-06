import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axiosInstance from '../axios-config';

// TABLE
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';



@Component({
  selector: 'app-resume-details',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
  ],
  templateUrl: './resume-details.component.html',
  styleUrl: './resume-details.component.css'
})
export class ResumeDetailsComponent implements OnInit {
openGlpiTrack(catic: string) {
  window.open('https://catic.cajapiura.pe/glpi/front/ticket.form.php?id='+catic, '_blank')
}

  ticketId: string | null = null; // Variable para almacenar el ID del ticket
  loading: boolean = false
  dataUser: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtén el parámetro 'id' de la ruta
    this.ticketId = this.route.snapshot.paramMap.get('id');
    // Ahora `ticketId` contiene el valor del parámetro pasado en la URL
    console.log('ID del ticket:', this.ticketId);
    this.getDataByUser()
  }

  async getDataByUser(): Promise<void> {
    this.loading = true; // Activar loader
    // const { dateFrom, dateTo } = this.reportForm.value;
    try {
      const response = await axiosInstance .post('/tickets/get-tickets-by-user-id', {
        userId: this.ticketId});
      this.dataUser = response.data;
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      this.loading = false; // Desactivar loader
    }
  }

}
