
// Configuración más robusta para desarrollo y producción
const getApiUrl = () => {
  // En desarrollo local
  if (import.meta.env.DEV) {
    return 'http://localhost:3000';
  }
  
  // En producción, usar la variable de entorno
  const prodUrl = import.meta.env.VITE_API_URL;
  if (prodUrl) {
    return prodUrl.replace(/\/$/, ''); // Quitar barra final
  }
  
  // Fallback
  return 'http://localhost:3000';
};

const API_URL = getApiUrl();

console.log('Entorno:', import.meta.env.MODE);
console.log('API_URL configurada:', API_URL);

export { API_URL };
