// src/mocks/reviewMock.ts
import { mockDelay } from './config';
import type { ReviewRequest, ReviewResponse, ReviewPagedResponse } from '../types/university';

// =========================================================================
// БАЗА ДАННЫХ В ПАМЯТИ (Имитируем таблицы бэка для отзывов)
// =========================================================================

// Переменная для хранения твоего личного отзыва (изначально null, будто ты еще ничего не писала)
export let myMockReviewStore: ReviewResponse | null = null;

// Массив с отзывами других студентов (привязаны к programId: 1, который мы создали на Шаге 2)
export let otherReviewsStore: ReviewResponse[] = [
  {
    id: 'mock-uuid-student-1',
    programId: 1,
    score: 5,
    comment: 'Прекрасное направление! Очень много практики по фронтенду, верстке и React. Преподаватели лояльные, всегда помогают с пет-проектами и развитием.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 дня назад
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
  },
  {
    id: 'mock-uuid-student-2',
    programId: 1,
    score: 4,
    comment: 'Программа сильная, но будьте готовы к серьезной нагрузке по операционным системам, дифференциальным уравнениям и теории вероятностей. Автоматы ставят редко, нужно ботать.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 часов назад
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString()
  }
];

// =========================================================================
// ОБРАБОТЧИКИ (Эмуляция контроллеров микросервиса отзывов)
// =========================================================================

export const reviewMockHandlers = {
  // 1. Получить личный отзыв по ID программы
  getMyReview: async (programId: number): Promise<ReviewResponse | null> => {
    await mockDelay(500);
    // Если программа совпадает и отзыв уже был создан в сессии — возвращаем его
    if (myMockReviewStore && myMockReviewStore.programId === programId) {
      return myMockReviewStore;
    }
    return null; // Иначе возвращаем null (сигнал для UI, что кнопки "Редактировать" еще нет)
  },

  // 2. Получить список отзывов других пользователей
  getProgramReviews: async (programId: number, page: number, size: number): Promise<ReviewPagedResponse> => {
    await mockDelay(800);

    // Фильтруем отзывы по ID программы
    const filtered = otherReviewsStore.filter(r => r.programId === programId);
    
    const content = [...filtered];
    // Если личный отзыв уже создан, добавим его в начало общего списка (как обычно делает бэкенд)
    if (myMockReviewStore && myMockReviewStore.programId === programId && !content.some(r => r.id === myMockReviewStore?.id)) {
      content.unshift(myMockReviewStore);
    }

    return {
      content: content,
      totalElements: content.length,
      totalPages: 1,
      last: true
    };
  },

  // 3. Сохранить или обновить отзыв (Upsert)
  saveReview: async (data: ReviewRequest): Promise<ReviewResponse> => {
    await mockDelay(600);

    if (myMockReviewStore && myMockReviewStore.programId === data.programId) {
      // Имитация LOGIC: UPDATE существующего отзыва
      myMockReviewStore = {
        ...myMockReviewStore,
        score: data.score,
        comment: data.comment,
        updatedAt: new Date().toISOString()
      };

      // Обновляем запись в общем списке, если она там есть
      const idx = otherReviewsStore.findIndex(r => r.id === myMockReviewStore?.id);
      if (idx !== -1) otherReviewsStore[idx] = myMockReviewStore;
    } else {
      // Имитация LOGIC: CREATE нового отзыва
      myMockReviewStore = {
        id: 'my-tracked-mock-uuid-9999',
        programId: data.programId,
        score: data.score,
        comment: data.comment,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Пушим в начало массива
      otherReviewsStore.unshift(myMockReviewStore);
    }

    return myMockReviewStore;
  }
};