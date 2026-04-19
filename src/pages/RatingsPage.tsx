import React from 'react';
import { Trophy, ArrowUpRight } from 'lucide-react';

export const RatingsPage: React.FC = () => {
  // Заглушка данных (позже заменим на запрос к API)
  const topUniversities = [
    { id: 1, name: 'МГУ им. Ломоносова', score: 98.5, trend: '+0.2' },
    { id: 2, name: 'МФТИ', score: 97.8, trend: '+0.5' },
    { id: 3, name: 'НИУ ВШЭ', score: 96.4, trend: '+0.1' },
    // ... и так далее до 10
  ];

  return (
    <div className="page-content">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Trophy color="gold" /> Топ-10 Университетов
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Рейтинг обновляется в реальном времени на основе отзывов и статистики</p>
      </div>

      <div style={tableContainerStyle}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Университет</th>
              <th style={thStyle}>Балл</th>
              <th style={thStyle}>Динамика</th>
            </tr>
          </thead>
          <tbody>
            {topUniversities.map((uni, index) => (
              <tr key={uni.id} style={trStyle}>
                <td style={{ ...tdStyle, fontWeight: 'bold', color: index < 3 ? 'var(--accent)' : 'inherit' }}>
                  {index + 1}
                </td>
                <td style={tdStyle}>{uni.name}</td>
                <td style={tdStyle}>{uni.score}</td>
                <td style={{ ...tdStyle, color: '#52c41a' }}>
                  <ArrowUpRight size={14} /> {uni.trend}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Стили для таблицы
const tableContainerStyle = {
  background: 'var(--bg-sidebar)',
  borderRadius: '16px',
  padding: '16px',
  border: '1px solid var(--border-color)'
};

const thStyle = { padding: '16px', color: 'var(--text-secondary)', fontSize: '14px' };
const tdStyle = { padding: '16px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' };
const trStyle = { transition: 'background 0.2s', cursor: 'default' };