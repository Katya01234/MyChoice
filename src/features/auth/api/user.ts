import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UserProfile } from '../../../types/User';
// --- ИМПОРТИРУЕМ НАШУ СИСТЕМУ МОКОВ ---
import { USE_MOCKS } from '../../../mocks/config';
import { authMockHandlers } from '../../../mocks/authMock';

const BASE_URL = 'https://unhygienically-fluxional-sharolyn.ngrok-free.dev'; 

// Объект с чистыми запросами
export const userApi = {
  getMe: (): Promise<Response> => {
    if (USE_MOCKS) return authMockHandlers.getMe(); // Перехват моком

    return fetch(`${BASE_URL}/api/users/me`, {
      method: 'GET',
      headers: { 
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  },

  getPublicProfile: (username: string): Promise<Response> => {
    if (USE_MOCKS) return authMockHandlers.getPublicProfile(username); // Перехват моком

    return fetch(`${BASE_URL}/api/users/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
  },

  updateMe: (userId: string, data: Partial<UserProfile>): Promise<Response> => {
    if (USE_MOCKS) return authMockHandlers.updateMe(data); // Перехват моком

    return fetch(`${BASE_URL}/api/users/me`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'X-Auth-User-Id': userId, 
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });
  },
};

// --- УМНЫЕ ХУКИ ДЛЯ КЭШИРОВАНИЯ ---

// Хук для получения профиля (своего или чужого)
export const useProfile = (username?: string, isMyProfile?: boolean) => {
  return useQuery({
    // Ключ кэша меняется в зависимости от пользователя
    queryKey: ['profile', username || 'me'], 
    queryFn: async () => {
      const response = isMyProfile || !username 
        ? await userApi.getMe() 
        : await userApi.getPublicProfile(username);

      if (!response.ok) throw new Error('Пользователь не найден');
      return response.json();
    },
    staleTime: 1000 * 60 * 10, // Данные "свежие" 10 минут
  });
};

// Хук для обновления профиля
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, data }: { userId: string, data: Partial<UserProfile> }) => {
      const response = await userApi.updateMe(userId, data);
      if (!response.ok) throw new Error('Ошибка при сохранении');
      return response.json();
    },
    onSuccess: (updatedData) => {
      // Сбрасываем кэш, чтобы на всех страницах данные обновились
      queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
      queryClient.setQueryData(['profile', 'me'], updatedData);
    }
  });
};
// export const userApi = {
//     getMe: () =>
//     fetch(`${BASE_URL}/api/users/me`, {
//       method: 'GET',
//       headers: { 
//         'Accept': '*/*',
//         'ngrok-skip-browser-warning': 'true',
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       }
//     }),
//     updateMe: (userId: string, data: any) =>
//     fetch(`${BASE_URL}/api/users/me`, {
//       method: 'PUT',
//       headers: { 
//         'Content-Type': 'application/json',
//         'Accept': '*/*',
//         'X-Auth-User-Id': userId 
//       },
//       body: JSON.stringify(data)
//     })
// }