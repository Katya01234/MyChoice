// src/types/User.ts

export type UserRole = 'ABITURIENT' | 'STUDENT' | 'TEACHER' | 'ADMIN';

// То, что мы получаем от /api/users/me (согласно твоему Swagger и ответам сервера)
export interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  role: UserRole;
  username?: string; // Если бэкенд генерирует username на основе почты
}

// Данные для логина
export interface LoginRequest {
  email: string;
  password: string;
}

// Данные для регистрации
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  role: UserRole;
}

// Упрощенный объект пользователя для хранения в стейте (AuthContext)
export interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}