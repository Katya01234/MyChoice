// src/features/university/api/reviewApi.ts
import { type ReviewRequest, type ReviewResponse, type ReviewPagedResponse } from '../../../types/university';

// --- ИМПОРТИРУЕМ НАШУ СИСТЕМУ МОКОВ ---
import { USE_MOCKS } from '../../../mocks/config';
import { reviewMockHandlers } from '../../../mocks/reviewMock';

const REVIEW_BASE_URL = 'https://unhygienically-fluxional-sharolyn.ngrok-free.dev';

// Безопасное извлечение UUID из JWT токена
const getUserIdFromToken = (): string => {
  const token = localStorage.getItem('token');
  if (!token) return '';
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    return payload.id || payload.userId || payload.sub || '';
  } catch (e) {
    return '';
  }
};

const getReviewHeaders = () => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'X-Auth-User-Id': getUserIdFromToken()
});

export const reviewApi = {
  // Получить личный отзыв по программе
  getMyReview: async (programId: number): Promise<ReviewResponse | null> => {
    if (USE_MOCKS) return reviewMockHandlers.getMyReview(programId); // Перехват моком

    const response = await fetch(`${REVIEW_BASE_URL}/api/review/my?programId=${programId}`, {
      method: 'GET',
      headers: getReviewHeaders()
    });
    if (response.status === 204 || response.status === 404) return null;
    if (!response.ok) throw new Error('Failed to fetch my review');
    return response.json();
  },

  // Получить список отзывов других пользователей
  getProgramReviews: async (programId: number, page = 0, size = 50): Promise<ReviewPagedResponse> => {
    if (USE_MOCKS) return reviewMockHandlers.getProgramReviews(programId, page, size); // Перехват моком

    const response = await fetch(`${REVIEW_BASE_URL}/api/review/program/${programId}?page=${page}&size=${size}`, {
      method: 'GET',
      headers: getReviewHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch program reviews');
    return response.json();
  },

  // Сохранить или обновить отзыв (Upsert)
  saveReview: async (data: ReviewRequest): Promise<ReviewResponse> => {
    if (USE_MOCKS) return reviewMockHandlers.saveReview(data); // Перехват моком

    const response = await fetch(`${REVIEW_BASE_URL}/api/review/save`, {
      method: 'POST',
      headers: getReviewHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to save review');
    return response.json();
  }
};