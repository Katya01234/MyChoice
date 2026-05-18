// src/mocks/config.ts

// ГЛАВНЫЙ РУБИЛЬНИК ПРИЛОЖЕНИЯ: 
// true — всё приложение работает на моках
// false — переключается на реальные эндпоинты бэкенда
export const USE_MOCKS = true; 

// Имитация задержки сети (чтобы протестировать isLoading, скелетоны и блокировки кнопок)
export const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Хелпер, маскирующий обычные объекты под валидный fetch Response.
// Это критически важно: твои хуки вызывают .json() и проверяют response.ok, 
// и благодаря этому хелперу нам вообще не придется менять код хуков TanStack Query!
export const createMockResponse = (data: any, status = 200): Response => {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
  } as Response;
};