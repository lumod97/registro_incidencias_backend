import { Injectable } from '@angular/core';
import axios from 'axios';  // Importa Axios

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = 'https://api.unsplash.com/photos/random'; // O la API que prefieras
  private accessKey = 'p2RZJCLfbUJWXGuYy6QRJ14O1iYhBiTCrbZvdQaT9BA'; // Aquí va tu clave de API de Unsplash

  constructor() {}

  // Método para obtener una imagen aleatoria
  getRandomImage() {
    return axios.get(`${this.apiUrl}?client_id=${this.accessKey}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching random image:', error);
        throw error;
      });
  }
}