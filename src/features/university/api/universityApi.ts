// src/features/university/api/universityApi.ts
import { 
  type UniversityResponse, 
  type FacultyResponse, 
  type ProgramResponse, 
  type FacultyShortResponse, 
  type PageResponse,
} from '../../../types/university';

const BASE_URL = 'https://unhygienically-fluxional-sharolyn.ngrok-free.dev';

// Общие заголовки для всех запросов к ngrok
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true', // Скипаем страницу-заглушку ngrok,
  'Authorization': `Bearer ${localStorage.getItem('token')}`
};

export const universityApi = {
  // Получить список университетов с пагинацией
  getUniversities: async (page = 0, size = 10): Promise<PageResponse<UniversityResponse>> => {
    const response = await fetch(`${BASE_URL}/api/universities?page=${page}&size=${size}`, {
      method: 'GET',
      headers: headers
    });
    if (!response.ok) throw new Error('Failed to fetch universities');
    return response.json();
  },

  // Получить конкретный университет
  getUniversityById: async (id: number): Promise<UniversityResponse> => {
    const response = await fetch(`${BASE_URL}/api/universities/${id}`, {
      method: 'GET',
      headers: headers
    });
    if (!response.ok) throw new Error('Failed to fetch university');
    return response.json();
  },

  // Получить факультеты конкретного университета
  getUniversityFaculties: async (universityId: number): Promise<FacultyShortResponse[]> => {
    const response = await fetch(`${BASE_URL}/api/universities/${universityId}/faculties`, {
      method: 'GET',
      headers: headers
    });
    if (!response.ok) throw new Error('Failed to fetch faculties');
    return response.json();
  },

  // Получить детальную информацию о факультете
  getFacultyById: async (id: number): Promise<FacultyResponse> => {
    const response = await fetch(`${BASE_URL}/api/faculties/${id}`, {
      method: 'GET',
      headers: headers
    });
    if (!response.ok) throw new Error('Failed to fetch faculty');
    return response.json();
  },

  // Получить программы факультета
  getFacultyPrograms: async (facultyId: number) => {
    const response = await fetch(`${BASE_URL}/api/faculties/${facultyId}/programs`, {
      method: 'GET',
      headers: headers
    });
    if (!response.ok) throw new Error('Failed to fetch programs');
    return response.json();
  },

  // Получить детальную информацию о программе
  getProgramById: async (id: number): Promise<ProgramResponse> => {
    const response = await fetch(`${BASE_URL}/api/programs/${id}`, {
      method: 'GET',
      headers: headers
    });
    if (!response.ok) throw new Error('Failed to fetch program');
    return response.json();
  }
};