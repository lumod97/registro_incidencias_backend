// src/app/config/axios-config.ts
import axios from 'axios';

// Configuración de Axios
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8080/', // Cambia esta URL a la de tu API
  timeout: 120000, // Tiempo de espera en milisegundos
  headers: {
    'Content-Type': 'application/json', // Tipo de contenido para las solicitudes
  },
});

// Interceptor para agregar el JWT a cada solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtén el JWT de localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Agrega el JWT al header Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Maneja errores en la configuración de la solicitud
  }
);

// Interceptor para manejar respuestas y posibles errores de autenticación
axiosInstance.interceptors.response.use(
  (response) => response, // Si la respuesta es correcta, la devuelve
  (error) => {
    // Manejar errores como token expirado o no autorizado
    if (error.response && error.response.status === 401) {
      // Aquí puedes redirigir al login, por ejemplo, si el token está expirado
      console.log("Token expirado o no autorizado. Redirigiendo a login...");
      // Redirige al login (esto depende de tu lógica de enrutamiento)
    }
    return Promise.reject(error); // Retorna el error para que se maneje en el lugar adecuado
  }
);

export default axiosInstance;
