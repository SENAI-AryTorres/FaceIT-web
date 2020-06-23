import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3333',
  baseURL: 'https://faceitapi.azurewebsites.net/api',
});

export default api;
