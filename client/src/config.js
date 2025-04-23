// In config.js or a new api.js file
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL
});

export const API_CONFIG = {
  baseURL
};