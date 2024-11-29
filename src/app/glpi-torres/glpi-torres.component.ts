import { Component, OnInit } from '@angular/core';
import axiosInstance from '../axios-config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';

// Interfaz para el tipo Torre
interface Torre {
  id: number;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-glpi-torres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './glpi-torres.component.html',
  styleUrls: ['./glpi-torres.component.css'],
})
export class GlpiTorresComponent implements OnInit {
  modalInstance: Modal | undefined;
  torres: Torre[] = []; // Lista de torres
  currentTorre: Torre = { id: 0, nombre: '', descripcion: '' }; // Torre actual (vacía por defecto)
  isEditing: boolean = false; // Flag para verificar si estamos editando
  showModal: boolean = false;

  ngOnInit(): void {
    this.loadTorres(); // Cargar las torres al inicio
  }

  // Obtener todas las torres
  async loadTorres(): Promise<void> {
    try {
      const response = await axiosInstance.get('/api/glpi-new-torres');
      this.torres = response.data;
    } catch (error) {
      console.error('Error al cargar las torres:', error);
      alert('Hubo un problema al cargar las torres. Inténtalo de nuevo.');
    }
  }

  // Guardar o actualizar torre
  async saveTorre(): Promise<void> {
    try {
      if (this.isEditing) {
        // Actualizar torre existente
        const response = await axiosInstance.put(
          `/api/glpi-new-torres/${this.currentTorre.id}`,
          this.currentTorre
        );
        const updatedTorre = response.data;
        const index = this.torres.findIndex((t) => t.id === updatedTorre.id);
        if (index !== -1) {
          this.torres[index] = updatedTorre; // Reemplazamos la torre actualizada
        }
        this.isEditing = false;
      } else {
        // Crear nueva torre
        const response = await axiosInstance.post(
          '/api/glpi-new-torres',
          this.currentTorre
        );
        this.torres.push(response.data); // Agregamos la nueva torre
      }

      // Cerrar el modal
      const modalElement = document.getElementById('addTorreModal') as HTMLElement;
      if (modalElement) {
        const modalInstance = new Modal(modalElement);
        modalInstance.hide();  // Cierra el modal
        modalElement.classList.remove('show'); // Eliminar la clase 'show' para evitar el backdrop pegado
        modalElement.setAttribute('aria-hidden', 'true'); // Quitar aria-hidden si ya está
        document.body.classList.remove('modal-open'); // Elimina la clase modal-open para eliminar el backdrop
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove(); // Elimina el backdrop manualmente
        }
      }

      // Mostrar SweetAlert de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'La torre ha sido guardada correctamente.',
        confirmButtonText: 'OK',
      });

      // Resetear el formulario o cualquier acción adicional
      this.resetForm();
    } catch (error) {
      console.error('Error al guardar la torre:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar la torre. Intenta de nuevo.',
        confirmButtonText: 'OK',
      });
    }
  }

  // Editar torre
  editTorre(torre: Torre): void {
    this.currentTorre = { ...torre }; // Clonar para evitar efectos secundarios
    this.isEditing = true;
  }

  // Eliminar torre
  async deleteTorre(id: number): Promise<void> {
    if (confirm('¿Estás seguro de que deseas eliminar esta torre?')) {
      try {
        await axiosInstance.delete(`/api/glpi-new-torres/${id}`);
        this.torres = this.torres.filter((torre) => torre.id !== id);
      } catch (error) {
        console.error('Error al eliminar la torre:', error);
        alert('Hubo un problema al eliminar la torre. Inténtalo de nuevo.');
      }
    }
  }

  // Resetear el formulario
  resetForm(): void {
    this.currentTorre = { id: 0, nombre: '', descripcion: '' };
  }

  // Método para mostrar o cerrar el modal
  toggleModal() {
    this.showModal = !this.showModal;
  }
  
  // ngAfterViewInit para manejar la instancia del modal
  ngAfterViewInit() {
    if (this.showModal) {
      const modalElement = document.getElementById('addTorreModal') as HTMLElement;
      this.modalInstance = new Modal(modalElement);
      this.modalInstance.show();
    }
  }

  // ngAfterViewChecked para verificar la existencia del modal en el DOM
  ngAfterViewChecked() {
    // Verificar si el modal debe ser mostrado y se ha insertado en el DOM
    if (this.showModal && !this.modalInstance) {
      const modalElement = document.getElementById('addTorreModal') as HTMLElement;
      if (modalElement) {
        this.modalInstance = new Modal(modalElement);
        this.modalInstance.show(); // Mostrar el modal
      }
    }

    // Verificar si el modal está oculto y limpiar el backdrop
    if (!this.showModal && this.modalInstance) {
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();  // Eliminar el backdrop manualmente
      }
      this.modalInstance.dispose();  // Destruir la instancia del modal
      this.modalInstance = undefined;  // Limpiar la instancia del modal
    }
  }

  // Método para cerrar el modal de manera controlada
  closeModal() {
    // if (this.modalInstance) {
    //   this.modalInstance.hide();
    // }
    this.showModal = false; // Esto destruye el modal debido al *ngIf
  }
}
