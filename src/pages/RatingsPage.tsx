// src/pages/RatingsPage.tsx
import React from 'react';
import { Trophy } from 'lucide-react';
import { useTopUniversities } from '../features/university/hooks/useUniversity';

export const RatingsPage: React.FC = () => {
  // Вызываем наш новый хук. По умолчанию он запрашивает топ-30, 
  // но мы можем ограничить отображение на клиенте первыми 10 или вывести все 30.
  const { data: topUniversities, isLoading, isError } = useTopUniversities(30);

  if (isLoading) {
    return (
      <div className="page-content" style={{ color: 'var(--text-primary)', padding: '20px' }}>
        Загрузка рейтинга университетов...
      </div>
    );
  }

  if (isError || !topUniversities) {
    return (
      <div className="page-content" style={{ color: 'var(--text-error)', padding: '20px' }}>
        Не удалось загрузить данные рейтинга. Пожалуйста, попробуйте позже.
      </div>
    );
  }

  return (
    <div className="page-content">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Trophy color="gold" /> Топ Университетов
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Рейтинг обновляется на основе отзывов пользователей и оценок направлений
        </p>
      </div>

      <div style={tableContainerStyle}>
        {topUniversities.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
                <th style={thStyle}>#</th>
                <th style={thStyle}>Код</th>
                <th style={thStyle}>Университет</th>
                <th style={thStyle}>Город</th>
                <th style={thStyle}>Балл</th>
              </tr>
            </thead>
            <tbody>
              {topUniversities.map((uni, index) => (
                <tr key={uni.id} style={trStyle}>
                  <td style={{ ...tdStyle, fontWeight: 'bold', color: index < 3 ? 'var(--accent-color)' : 'inherit' }}>
                    {index + 1}
                  </td>
                  <td style={{ ...tdStyle, color: 'var(--text-secondary)', fontSize: '13px' }}>
                    {uni.code}
                  </td>
                  <td style={{ ...tdStyle, fontWeight: index < 3 ? '500' : 'normal' }}>
                    {uni.name}
                  </td>
                  <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>
                    {uni.city}
                  </td>
                  <td style={{ ...tdStyle, fontWeight: 'bold', color: 'var(--accent-color)' }}>
                    {uni.rating ? uni.rating.toFixed(1) : '0.0'} / 10 ★
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', textAlign: 'center', padding: '20px' }}>
            Список рейтингов пока пуст.
          </p>
        )}
      </div>
    </div>
  );
};

// Стили для таблицы (остаются прежними, добавили адаптивность цвета текста)
const tableContainerStyle = {
  background: 'var(--bg-sidebar)',
  borderRadius: '16px',
  padding: '16px',
  border: '1px solid var(--border-color)',
  overflowX: 'auto' as const // На случай узких экранов
};

const thStyle = { padding: '16px', color: 'var(--text-secondary)', fontSize: '14px' };
const tdStyle = { padding: '16px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' };
const trStyle = { transition: 'background 0.2s', cursor: 'default' };