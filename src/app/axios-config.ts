// src/app/config/axios-config.ts
import axios from 'axios';

// Configuración de Axios
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8080/', // Cambia esta URL a la de tu API
  timeout: 120000, // Tiempo de espera en milisegundos
  headers: {
    'Content-Type': 'application/json',
    // Añade otros headers si es necesario
  },
});

export default axiosInstance;
 