import { Component, OnInit } from '@angular/core';
import axiosInstance from '../axios-config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


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
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './glpi-new-trabajadores-torre.component.html',
  styleUrls: ['./glpi-new-trabajadores-torre.component.css'],
})
export class GlpiTrabajadoresTorreComponent implements OnInit {
  trabajadoresTorre: { usuario: Usuario, torre: Torre }[] = []; // Lista de trabajadores por torre
  usuarios: Usuario[] = []; // Lista de usuarios
  torres: Torre[] = []; // Lista de torres
  currentTrabajadorTorre: { usuario: Usuario, torre: Torre } = { usuario: { id: 0, name: '' }, torre: { id: 0, nombre: '' } }; // TrabajadorTorre actual (vacío por defecto)
  isEditing: boolean = false; // Flag para verificar si estamos editando

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
      const {data} = await axiosInstance.get('/api/glpi-users');
      this.usuarios = data;
      console.log(data[5])
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

  // Guardar o actualizar trabajador por torre
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
        this.trabajadoresTorre.push(response.data); // Agregamos el nuevo trabajador por torre
      }

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
        this.trabajadoresTorre = this.trabajadoresTorre.filter((trabajador) => trabajador.usuario.id !== id);
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
