// src/mocks/authMock.ts
import { mockDelay, createMockResponse } from './config';
import type { LoginRequest, RegisterRequest, UserProfile } from '../types/User';

// Внутреннее изменяемое состояние текущего пользователя ("база данных бэка")
// Теперь строго соответствует твоему интерфейсу UserProfile
export let mockCurrentUser: UserProfile = {
  username: 'it_ambassador',
  firstName: 'Анастасия',
  lastName: 'Иванова',
  email: 'student@rwb.dev',
  age: 20,
  city: 'Москва',
  role: 'STUDENT', // Наша ключевая роль для тестирования отзывов!
};

// База данных других (чужих) профилей
const mockPublicProfiles: Record<string, UserProfile> = {
  'ivan_backend': {
    username: 'ivan_backend',
    firstName: 'Иван',
    lastName: 'Петров',
    email: 'ivan@university.edu',
    age: 21,
    city: 'Санкт-Петербург',
    role: 'STUDENT',
  },
  'masha_math': {
    username: 'masha_math',
    firstName: 'Мария',
    lastName: 'Сидорова',
    email: 'masha@university.edu',
    age: 19,
    city: 'Новосибирск',
    role: 'STUDENT',
  }
};

export const authMockHandlers = {
  // Имитация входа
  login: async (data: LoginRequest): Promise<Response> => {
    await mockDelay(600);
    // Для удобства тестирования пускаем с любым паролем
    localStorage.setItem('token', 'mock-jwt-token-xyz');
    return createMockResponse({
      token: 'mock-jwt-token-xyz',
      username: data.email.split('@')[0] // имитируем генерацию юзернейма бэком
    });
  },

  // Имитация регистрации
  register: async (data: RegisterRequest): Promise<Response> => {
    await mockDelay(800);
    return createMockResponse({
      message: 'Пользователь успешно зарегистрирован',
      userId: 'new-generated-uuid-9999'
    });
  },

  // Получение профиля текущего авторизованного юзера
  getMe: async (): Promise<Response> => {
    await mockDelay(400);
    return createMockResponse(mockCurrentUser);
  },

  // Получение чужого публичного профиля
  getPublicProfile: async (username: string): Promise<Response> => {
    await mockDelay(400);
    const profile = mockPublicProfiles[username];
    if (!profile) {
      return createMockResponse({ message: 'Пользователь не найден' }, 404);
    }
    return createMockResponse(profile);
  },

  // Обновление профиля (принимает data, так как в userApi передается еще и userId)
  updateMe: async (data: Partial<UserProfile>): Promise<Response> => {
    await mockDelay(700);
    // Записываем измененные данные в наше моковое хранилище
    mockCurrentUser = {
      ...mockCurrentUser,
      ...data
    };
    return createMockResponse(mockCurrentUser);
  }
};