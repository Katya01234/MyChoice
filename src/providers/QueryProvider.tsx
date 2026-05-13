// src/providers/QueryProvider.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useState } from 'react';

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  // Создаем клиент внутри компонента, чтобы избежать проблем при SSR (если надумаешь)
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Отключаем лишние запросы при смене вкладок
        retry: 1, // Если запрос упал, попробуем еще один раз
        staleTime: 5 * 60 * 1000, // Данные считаются свежими 5 минут
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};