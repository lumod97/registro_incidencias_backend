import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import axiosInstance from '../axios-config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import Swal from 'sweetalert2';  // Importa SweetAlert2
import * as bootstrap from 'bootstrap'
import { Modal } from 'bootstrap';



// Interfaces para los tipos Usuario y Torre
interface Usuario {
  id: number;
  name: string;
}

interface Torre {
  id: number;
  nombre: string;
}


@Component({
  selector: 'app-glpi-new-trabajadores-torre',
  standalone: true,
  imports: [CommonModule, FormsModule,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,
  ],
  templateUrl: './glpi-new-trabajadores-torre.component.html',
  styleUrls: ['./glpi-new-trabajadores-torre.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GlpiTrabajadoresTorreComponent implements OnInit {
  modalInstance: Modal | undefined;

  // Método para mostrar o cerrar el modal
  toggleModal() {
    this.showModal = !this.showModal;
  }

  // ngAfterViewChecked para verificar la existencia del modal en el DOM
  ngAfterViewChecked() {
    // Verificar si el modal debe ser mostrado y se ha insertado en el DOM
    if (this.showModal && !this.modalInstance) {
      const modalElement = document.getElementById('addTrabajadorModal') as HTMLElement;
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

  // ngAfterViewInit para manejar la instancia del modal
  ngAfterViewInit() {
    if (this.showModal) {
      const modalElement = document.getElementById('addTrabajadorModal') as HTMLElement;
      this.modalInstance = new Modal(modalElement);
      this.modalInstance.show();
    }
  }

  // Método para cerrar el modal de manera controlada
  closeModal() {
    // if (this.modalInstance) {
    //   this.modalInstance.hide();
    // }
    this.showModal = false; // Esto destruye el modal debido al *ngIf
  }


  trabajadoresTorre: { usuario: Usuario, torre: Torre, id: number }[] = []; // Lista de trabajadores por torre
  usuarios: Usuario[] = []; // Lista de usuarios
  torres: Torre[] = []; // Lista de torres
  currentTrabajadorTorre: { usuario: Usuario, torre: Torre } = { usuario: { id: 0, name: '' }, torre: { id: 0, nombre: '' } }; // TrabajadorTorre actual (vacío por defecto)
  isEditing: boolean = false; // Flag para verificar si estamos editando
  showModal: boolean = false;

  ngOnInit(): void {
    this.loadUsuarios(); // Cargar los usuarios al inicio
    this.loadTorres(); // Cargar las torres al inicio
    this.loadTrabajadoresTorre(); // Cargar los trabajadores por torre
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

  // Obtener todos los usuarios
  async loadUsuarios(): Promise<void> {
    try {
      const { data } = await axiosInstance.get('/api/glpi-users');
      this.usuarios = data;
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
      alert('Hubo un problema al cargar los usuarios. Inténtalo de nuevo.');
    }
  }

  // Obtener todos los trabajadores por torre
  async loadTrabajadoresTorre(): Promise<void> {
    try {
      const response = await axiosInstance.get('/api/glpi-new-trabajadores-torre');
      this.trabajadoresTorre = response.data;
    } catch (error) {
      console.error('Error al cargar los trabajadores por torre:', error);
      alert('Hubo un problema al cargar los trabajadores. Inténtalo de nuevo.');
    }
  }

  // Método para guardar el trabajador
  async saveTrabajadorTorre(): Promise<void> {
    try {
      if (this.isEditing) {
        // Actualizar trabajador por torre existente
        const response = await axiosInstance.put(
          `/api/glpi-new-trabajadores-torre/${this.currentTrabajadorTorre.usuario.id}`,
          this.currentTrabajadorTorre
        );
        const updatedTrabajador = response.data;
        const index = this.trabajadoresTorre.findIndex((t) => t.usuario.id === updatedTrabajador.usuario.id);
        if (index !== -1) {
          this.trabajadoresTorre[index] = updatedTrabajador; // Reemplazamos el trabajador actualizado
        }
        this.isEditing = false;
      } else {
        // Crear nuevo trabajador por torre
        const response = await axiosInstance.post(
          '/api/glpi-new-trabajadores-torre',
          this.currentTrabajadorTorre
        );
        this.loadTrabajadoresTorre(); // Cargar los trabajadores por torre
      }

      // Cerrar el modal de forma controlada
      this.closeModal();

      // Mostrar SweetAlert de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'El trabajador ha sido guardado correctamente.',
        confirmButtonText: 'OK',
      });

      // Resetear el formulario
      this.resetForm();
    } catch (error) {
      console.error('Error al guardar el trabajador por torre:', error);
      alert('Hubo un problema al guardar el trabajador. Inténtalo de nuevo.');
    }
  }



  // Editar trabajador por torre
  editTrabajadorTorre(trabajador: { usuario: Usuario, torre: Torre }): void {
    this.currentTrabajadorTorre = { ...trabajador }; // Clonar para evitar efectos secundarios
    this.isEditing = true;
  }

  // Eliminar trabajador por torre
  async deleteTrabajadorTorre(id: number): Promise<void> {
    if (confirm('¿Estás seguro de que deseas eliminar este trabajador?')) {
      try {
        await axiosInstance.delete(`/api/glpi-new-trabajadores-torre/${id}`);
        this.loadTrabajadoresTorre()
      } catch (error) {
        console.error('Error al eliminar el trabajador:', error);
        alert('Hubo un problema al eliminar el trabajador. Inténtalo de nuevo.');
      }
    }
  }

  // Resetear el formulario
  resetForm(): void {
    this.currentTrabajadorTorre = { usuario: { id: 0, name: '' }, torre: { id: 0, nombre: '' } };
  }
}
