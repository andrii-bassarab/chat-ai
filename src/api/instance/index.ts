import { API_URL } from '@/env';
import axios from 'axios';

export const appInstance = axios.create({
  baseURL: `${API_URL}/`,
});

