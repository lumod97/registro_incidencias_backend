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
  notifications!: { message: string; type: string; }[]; // Declaración

  modalInstance!: bootstrap.Modal;

  constructor() {
    // Generar notificaciones aleatorias al iniciar
    this.notifications = []; // Inicialización
    this.generateRandomNotifications();
  }

  generateRandomNotifications() {
    this.notifications.push({ message: 'Ticket #001: Atención al cliente requerida.', type: 'danger' })
    this.notifications.push({ message: 'Ticket #002: Problema con la cuenta.', type: 'warning' })
    this.notifications.push({ message: 'Ticket #003: Solicitud de devolución.', type: 'warning' })
    this.notifications.push({ message: 'Ticket #004: Consulta sobre productos.', type: 'info' })
    this.notifications.push({ message: 'Ticket #005: Queja sobre el servicio.', type: 'info' })
    this.notifications.push({ message: 'Ticket #006: Comentario positivo.', type: 'info' })
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
