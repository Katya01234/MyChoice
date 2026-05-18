import type { LoginRequest, RegisterRequest } from '../../../types/User';

// --- ИМПОРТИРУЕМ НАШУ СИСТЕМУ МОКОВ ---
import { USE_MOCKS } from '../../../mocks/config';
import { authMockHandlers } from '../../../mocks/authMock';

const BASE_URL = 'https://unhygienically-fluxional-sharolyn.ngrok-free.dev'; 

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: any) => {
      const response = await fetch('https://unhygienically-fluxional-sharolyn.ngrok-free.dev/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Ошибка регистрации');
      return response.json();
    },
    onSuccess: () => {
      // После регистрации можно очистить кэш, если это нужно
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    }
  });
};

export const authApi = {
  login: (data: LoginRequest): Promise<Response> => {
    if (USE_MOCKS) return authMockHandlers.login(data); // Перехват моком

    return fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  },

  register: (data: RegisterRequest): Promise<Response> => {
    if (USE_MOCKS) return authMockHandlers.register(data); // Перехват моком

    return fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
};