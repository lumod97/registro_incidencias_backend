import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import axiosInstance from '../axios-config';

@Component({
  selector: 'app-metas-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './metas-crud.component.html',
  styleUrls: ['./metas-crud.component.css']  // Asegúrate de que sea 'styleUrls' no 'styleUrl'
})
export class MetasCrudComponent implements OnInit {
  metas = [
    { id: 0, periodo: '', userId: '', name: '', meta: 0 }
  ];
  // metas = [...this.metas];

  newMeta = {
    id: 0,
    periodo: '',
    userId: '',
    meta: 0,
  };

  filter = {
    periodo: '',
    userId: '',
  };

  editingIndex: number | null = null; // Índice de la meta en edición (null si no está en modo edición)
  editing: boolean = false; // Flag para indicar si estamos en modo edición o creación

  // Método para abrir el modal de agregar meta
  openAddMetaModal() {
    const modalElement = document.getElementById('addMetaModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  // Método para agregar una nueva meta
  async addMeta(): Promise<void> {
    if (this.newMeta.periodo && this.newMeta.userId && this.newMeta.meta) {
      try {
        // Realizar la llamada POST al endpoint para insertar la nueva meta
        const response = await axiosInstance.post('/metas/new-meta', this.newMeta);

        // Si la creación de la meta fue exitosa, agregarla a la lista
        this.metas.push(response.data); // `response.data` contiene la meta creada desde el backend
        this.getDataMetas(); // Actualizar la tabla después de agregar

        // Limpiar el formulario de nueva meta
        this.clearNewMetaForm();

        // Cerrar el modal después de guardar
        const modalElement = document.getElementById('addMetaModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal?.hide();
        }
      } catch (error) {
        console.error('Error al agregar la meta:', error);
        alert('Hubo un error al guardar la meta. Intenta de nuevo.');
      }
    } else {
      alert('Por favor, completa todos los campos antes de guardar la meta.');
    }
  }

  // Método para obtener las metas filtradas o todas las metas
  async getDataMetas(): Promise<void> {
    const requestSearch = {
      periodo: this.filter.periodo,
      userId: this.filter.userId
    };

    try {
      // Llamada a la API para obtener las metas filtradas
      const response = await axiosInstance.post('/metas/get-metas-filtered', requestSearch);

      // Si la respuesta tiene datos, actualizamos metas
      this.metas = response.data.length ? response.data : [{ periodo: '', userId: '', name: '', meta: 0 }]; // Si no hay datos, mostramos un array vacío
    } catch (error) {
      console.error('Error fetching filtered metas:', error);
    }
  }

  // Limpia el formulario de nueva meta
  clearNewMetaForm() {
    this.newMeta = { id: 0, periodo: '', userId: '', meta: 0 };
  }

  // Método para eliminar una meta con confirmación
  async deleteMeta(index: number): Promise<void> {
    // Solicitar confirmación del usuario
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar esta meta?');
    if (confirmDelete) {
        const id = this.metas[index].id
      try {
        const response = await axiosInstance.delete(`/metas/delete-meta?id=${id}`);
        
        this.metas.splice(index, 1);
        this.getDataMetas();
      } catch (error) {
        console.error('Error al eliminar la meta:', error);
        alert('Hubo un error al eliminar la meta. Intenta de nuevo.');
      }
      
    }
  }


  // Llamada al método getDataMetas al iniciar el componente
  ngOnInit(): void {
    this.getDataMetas(); // Obtener las metas al cargar el componente
  }
}
