// src/mocks/universityMock.ts
import { mockDelay, createMockResponse } from './config';
import type { 
  UniversityResponse, 
  FacultyResponse, 
  ProgramResponse, 
  FacultyShortResponse, 
  PageResponse 
} from '../types/university';

// =========================================================================
// 1. БАЗА ДАННЫХ В ПАМЯТИ (Имитируем таблицы бэкенда)
// =========================================================================

const mockUniversities: UniversityResponse[] = [
  {
    id: 1,
    code: 'VSE',
    name: 'Высшая Школа Электроники и Информатики',
    city: 'Москва',
    description: 'Один из ведущих технологических институтов, специализирующийся на подготовке высококлассных IT-специалистов, фронтенд-разработчиков и архитекторов программных систем.',
    rating: 4.8
  },
  {
    id: 2,
    code: 'MSTU',
    name: 'Государственный Технический Университет',
    city: 'Санкт-Петербург',
    description: 'Классический технический университет с глубокой фундаментальной подготовкой в области прикладной математики, физики и системного программирования.',
    rating: 4.6
  }
];

const mockFaculties: FacultyResponse[] = [
  {
    id: 101,
    name: 'Факультет Информационных Технологий (ФИТ)',
    description: 'Флагманский факультет по подготовке разработчиков программного обеспечения. Современные лаборатории, проектное обучение и сильное комьюнити.',
    rating: 4.9,
    university: { id: 1, name: 'Высшая Школа Электроники и Информатики', code: 'VSE' }
  },
  {
    id: 102,
    name: 'Факультет Робототехники и Системного Анализа',
    description: 'Обучение проектированию сложных встроенных систем, интернета вещей (IoT) и программированию микроконтроллеров.',
    rating: 4.5,
    university: { id: 1, name: 'Высшая Школа Электроники и Информатики', code: 'VSE' }
  },
  {
    id: 201,
    name: 'Факультет Прикладной Математики и Компьютерных Наук',
    description: 'Глубокое изучение алгоритмов, структур данных, дискретной математики и методов машинного обучения.',
    rating: 4.7,
    university: { id: 2, name: 'Государственный Технический Университет', code: 'MSTU' }
  }
];

const mockPrograms: ProgramResponse[] = [
  {
    id: 1, // ID = 1, как раз на него мы ссылались в Шаге 1 и отзывах!
    name: 'Современная фронтенд-разработка и веб-технологии',
    description: 'Программа сфокусирована на создании сложных клиентских приложений. Изучаются React, TypeScript, архитектура веб-приложений, адаптивная верстка (Grid/Flexbox) и интеграция с REST/GraphQL API.',
    rating: 4.9,
    degree: 'BACHELOR',
    direction: {
      code: '09.03.04',
      name: 'Программная инженерия'
    },
    faculty: {
      id: 101,
      name: 'Факультет Информационных Технологий (ФИТ)',
      rating: 4.9
    }
  },
  {
    id: 2,
    name: 'Разработка распределенных систем и Big Data',
    description: 'Проектирование высоконагруженных бэкенд-систем, основы параллельных вычислений, баз данных и брокеров сообщений.',
    rating: 4.7,
    degree: 'BACHELOR',
    direction: {
      code: '09.03.01',
      name: 'Информатика и вычислительная техника'
    },
    faculty: {
      id: 101,
      name: 'Факультет Информационных Технологий (ФИТ)',
      rating: 4.9
    }
  },
  {
    id: 3,
    name: 'Архитектура программного обеспечения',
    description: 'Магистерская программа для будущих IT-архитекторов и тимлидов. Проектирование микросервисов и Enterprise-решений.',
    rating: 4.8,
    degree: 'MASTER',
    direction: {
      code: '09.04.04',
      name: 'Программная инженерия'
    },
    faculty: {
      id: 101,
      name: 'Факультет Информационных Технологий (ФИТ)',
      rating: 4.9
    }
  }
];

// =========================================================================
// 2. ОБРАБОТЧИКИ (Имитируют логику контроллеров бэкенда)
// =========================================================================

export const universityMockHandlers = {
  // Получить список университетов с пагинацией
  getUniversities: async (page: number, size: number): Promise<PageResponse<UniversityResponse>> => {
    await mockDelay(500);
    const start = page * size;
    const end = start + size;
    const pagedContent = mockUniversities.slice(start, end);

    return {
      content: pagedContent,
      page,
      size,
      totalElements: mockUniversities.length,
      totalPages: Math.ceil(mockUniversities.length / size)
    };
  },

  // Получить конкретный университет
  getUniversityById: async (id: number): Promise<UniversityResponse> => {
    await mockDelay(400);
    const uni = mockUniversities.find(u => u.id === id);
    if (!uni) throw new Error(`University with id ${id} not found`);
    return uni;
  },

  // Получить факультеты конкретного университета (возвращает FacultyShortResponse[])
  getUniversityFaculties: async (universityId: number): Promise<FacultyShortResponse[]> => {
    await mockDelay(400);
    return mockFaculties
      .filter(f => f.university.id === universityId)
      .map(f => ({
        id: f.id,
        name: f.name,
        rating: f.rating
      }));
  },

  // Получить детальную информацию о факультете
  getFacultyById: async (id: number): Promise<FacultyResponse> => {
    await mockDelay(400);
    const faculty = mockFaculties.find(f => f.id === id);
    if (!faculty) throw new Error(`Faculty with id ${id} not found`);
    return faculty;
  },

  // Получить программы факультета
  getFacultyPrograms: async (facultyId: number): Promise<ProgramResponse[]> => {
    await mockDelay(400);
    // Фильтруем программы, принадлежащие данному факультету
    return mockPrograms.filter(p => p.faculty.id === facultyId);
  },

  // Получить детальную информацию о программе
  getProgramById: async (id: number): Promise<ProgramResponse> => {
    await mockDelay(400);
    const program = mockPrograms.find(p => p.id === id);
    if (!program) throw new Error(`Program with id ${id} not found`);
    return program;
  }
};