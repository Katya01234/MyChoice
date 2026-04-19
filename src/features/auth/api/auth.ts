import type { LoginRequest, RegisterRequest } from '../../../types/User';

const BASE_URL = 'https://unhygienically-fluxional-sharolyn.ngrok-free.dev'; 


export const authApi = {
  login: (data: LoginRequest) => 
    fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }),

  register: (data: RegisterRequest) => 
    fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
};