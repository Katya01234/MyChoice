// src/features/university/api/universityApi.ts
import { 
  type UniversityResponse, 
  type FacultyResponse, 
  type ProgramResponse, 
  type FacultyShortResponse, 
  type PageResponse,
} from '../../../types/university';

// --- ИМПОРТИРУЕМ НАШУ СИСТЕМУ МОКОВ ---
import { USE_MOCKS } from '../../../mocks/config';
import { universityMockHandlers } from '../../../mocks/universityMock';

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
    if (USE_MOCKS) return universityMockHandlers.getUniversities(page, size);

    const response = await fetch(`${BASE_URL}/api/universities?page=${page}&size=${size}`, {
      method: 'GET',
      headers: headers
    });
    if (!response.ok) throw new Error('Failed to fetch universities');
    return response.json();
  },

  getTopUniversities: async (limit = 30): Promise<UniversityResponse[]> => {
    if (USE_MOCKS) {
      // На случай если мок-хэндлер еще не написан, вернем пустой массив или вызовем его, если он есть
      return typeof universityMockHandlers.getTopUniversities === 'function' 
        ? universityMockHandlers.getTopUniversities(limit) 
        : [];
    }

    const response = await fetch(`${BASE_URL}/api/universities/top?limit=${limit}`, {
      method: 'GET',
      headers: headers
    });
    if (!response.ok) throw new Error('Failed to fetch top universities');
    return response.json();
  },

  // Получить конкретный университет
  getUniversityById: async (id: number): Promise<UniversityResponse> => {
    if (USE_MOCKS) return universityMockHandlers.getUniversityById(id);

    const response = await fetch(`${BASE_URL}/api/universities/${id}`, {
      method: 'GET',
      headers: headers
    });
    if (!response.ok) throw new Error('Failed to fetch university');
    return response.json();
  },

  // Получить факультеты конкретного университета
  getUniversityFaculties: async (universityId: number): Promise<FacultyShortResponse[]> => {
    if (USE_MOCKS) return universityMockHandlers.getUniversityFaculties(universityId);

    const response = await fetch(`${BASE_URL}/api/universities/${universityId}/faculties`, {
      method: 'GET',
      headers: headers
    });
    if (!response.ok) throw new Error('Failed to fetch faculties');
    return response.json();
  },

  // Получить детальную информацию о факультете
  getFacultyById: async (id: number): Promise<FacultyResponse> => {
    if (USE_MOCKS) return universityMockHandlers.getFacultyById(id);

    const response = await fetch(`${BASE_URL}/api/faculties/${id}`, {
      method: 'GET',
      headers: headers
    });
    if (!response.ok) throw new Error('Failed to fetch faculty');
    return response.json();
  },

  // Получить программы факультета
  getFacultyPrograms: async (facultyId: number): Promise<ProgramResponse[]> => {
    if (USE_MOCKS) return universityMockHandlers.getFacultyPrograms(facultyId);

    const response = await fetch(`${BASE_URL}/api/faculties/${facultyId}/programs`, {
      method: 'GET',
      headers: headers
    });
    if (!response.ok) throw new Error('Failed to fetch programs');
    return response.json();
  },

  // Получить детальную информацию о программе
  getProgramById: async (id: number): Promise<ProgramResponse> => {
    if (USE_MOCKS) return universityMockHandlers.getProgramById(id);

    const response = await fetch(`${BASE_URL}/api/programs/${id}`, {
      method: 'GET',
      headers: headers
    });
    if (!response.ok) throw new Error('Failed to fetch program');
    return response.json();
  }
};