import type { LoginRequest, RegisterRequest } from '../../../types/User';
const BASE_URL = 'http://localhost:8081'; // Берем из "servers" в JSON

export const authApi = {
  // Вход в систему
  login: (data: LoginRequest) => 
    fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }),

  // Регистрация
  register: (data: RegisterRequest) => 
    fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
};