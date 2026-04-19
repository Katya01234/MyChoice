import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // Добавляем импорты

// Импорты стилей
import './utils/css/dark-hc.css'
import './utils/css/dark-mc.css' 
import './utils/css/dark.css'
import './utils/css/light-hc.css'
import './utils/css/light-mc.css' 
import './utils/css/light.css'
import './layouts/LayoutStructure.css'
import './index.css'

import App from './App.tsx'
// import { AuthProvider } from './providers/AuthContext' // Если AuthProvider живет здесь, не забудь импорт

// 1. Создаем клиент кэширования вне компонента
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 минут данные не будут запрашиваться заново
      gcTime: 1000 * 60 * 30,    // 30 минут храним в памяти
      refetchOnWindowFocus: false, // Чтобы не спамить запросами при переключении вкладок
      retry: 1, // Если запрос упал, попробуем еще один раз и всё
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 2. Оборачиваем всё приложение в QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      {/* Если у тебя AuthProvider подключается здесь, то он будет внутри:
          <AuthProvider>
            <App />
          </AuthProvider> 
      */}
      <App />
    </QueryClientProvider>
  </StrictMode>,
)