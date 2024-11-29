import { Component, OnInit } from '@angular/core';
import axiosInstance from '../axios-config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  torres: Torre[] = []; // Lista de torres
  currentTorre: Torre = { id: 0, nombre: '', descripcion: '' }; // Torre actual (vacía por defecto)
  isEditing: boolean = false; // Flag para verificar si estamos editando

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

      // Resetear el formulario
      this.resetForm();
    } catch (error) {
      console.error('Error al guardar la torre:', error);
      alert('Hubo un problema al guardar la torre. Inténtalo de nuevo.');
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
}
