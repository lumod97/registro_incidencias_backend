import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-notification-modal',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css']
})
export class NotificationModalComponent {
  notifications!: { code: Number; category : string; priority: string ; message: string; type: string; }[]; // Declaración

  modalInstance!: bootstrap.Modal;

  constructor() {
    // Generar notificaciones aleatorias al iniciar
    this.notifications = []; // Inicialización
    this.generateRandomNotifications();
  }

  generateRandomNotifications() {
    this.notifications.push({ code: 74540, category: 'GESTION DE APLICACIONES > ADM, OPE, INNO > PROCESOS BATCH - CIERRE DIARIO', priority: 'Alta', message: 'CAIDA DE CIERRE DIARIO - 891067/DIAS/SIAFDOCI / AL CIERRE DEL 31/08/2021', type: 'danger' })
    this.notifications.push({ code: 75319, category: 'MODIFICAR DATOS > ERROR PROGRAMA', priority: 'Alta', message: 'URGENTE: No se genera reporte consolidado mensual de seguros set 2021.', type: 'danger' })
    this.notifications.push({ code: 81989, category: 'CONSULTA', priority: 'Alta', message: 'FLUJO DE APROBACION', type: 'warning' })
    this.notifications.push({ code: 294986, category: 'MODIFICAR DATOS > FALTA DE FUNCIONALIDAD - AHORROS > MODIFICAR EMPLEADOR DE CUENTA DE CTS', priority: 'Alta', message: 'SOLIIO CAMBIO DE EMPLEADOR DE 51 CLIENTES', type: 'warning' })
    // this.notifications.push({ message: 'Ticket #004: Consulta sobre productos.', type: 'info' })
    // this.notifications.push({ message: 'Ticket #005: Queja sobre el servicio.', type: 'info' })
    // this.notifications.push({ message: 'Ticket #006: Comentario positivo.', type: 'info' })
  }

  openModal() {
    const modalElement = document.getElementById('notificationModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();
    }
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }
}
