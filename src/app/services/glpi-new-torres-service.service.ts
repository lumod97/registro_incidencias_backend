import { Injectable } from '@angular/core';
import axiosInstance from '../axios-config';

@Injectable({
  providedIn: 'root',
})
export class GlpiNewTorresService {
  private readonly baseUrl = '/api/glpi-new-torres'; // Ruta base para la API

  // Obtener todas las torres
  async getAll() {
    try {
      const response = await axiosInstance.get(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error('Error al obtener las torres:', error);
      throw error;
    }
  }

  // Obtener una torre por ID
  async getById(id: number) {
    try {
      const response = await axiosInstance.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener la torre con ID ${id}:`, error);
      throw error;
    }
  }

  // Crear una nueva torre
  async create(data: { nombre: string; descripcion?: string }) {
    try {
      const response = await axiosInstance.post(this.baseUrl, data);
      return response.data;
    } catch (error) {
      console.error('Error al crear la torre:', error);
      throw error;
    }
  }

  // Actualizar una torre existente
  async update(id: number, data: { nombre: string; descripcion?: string }) {
    try {
      const response = await axiosInstance.put(`${this.baseUrl}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar la torre con ID ${id}:`, error);
      throw error;
    }
  }

  // Eliminar una torre
  async delete(id: number) {
    try {
      const response = await axiosInstance.delete(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar la torre con ID ${id}:`, error);
      throw error;
    }
  }
}
