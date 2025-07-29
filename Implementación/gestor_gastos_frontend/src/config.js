
const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:3000';

console.log('API_URL configurada:', API_URL);

export { API_URL };
