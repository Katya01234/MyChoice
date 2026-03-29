// src/types/user.ts

export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  avatarUrl?: string; // Опционально
  status: 'Абитуриент' | 'Студент' | 'Представитель ВУЗа';
  registrationDate: string;
  // Дополнительные поля для абитуриента
  targetSpecialties: string[]; // Целевые специальности (например, 'Программирование')
  preferredCities: string[];   // Предпочитаемые города
  averageEgeScore?: number;    // Средний балл ЕГЭ (опционально)
}

export type UserRole = 'ABITURIENT' | 'STUDENT' | 'TEACHER' | 'ADMIN';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: UserRole;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string; // Это наш логин
  role: UserRole;
}