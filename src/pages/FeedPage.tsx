import React, { useState } from 'react';
import { Search } from 'lucide-react';

export const FeedPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="page-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', color: 'var(--text-primary)', margin: 0 }}>Лента новостей</h1>
        
        {/* Поиск только для новостей */}
        <div className="search-bar" style={{ width: '350px' }}>
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Поиск по новостям админов..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Пример карточки новости */}
      <div className="feed-card" style={feedCardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '14px' }}>АДМИНИСТРАЦИЯ</span>
          <span style={{ color: 'var(--text-secondary)', opacity: 0.6, fontSize: '12px' }}>29.03.2026</span>
        </div>
        <h2 style={{ fontSize: '18px', marginBottom: '10px', color: 'var(--text-primary)' }}>Старт приемной кампании 2026</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Приветствуем будущих студентов! Мы обновили список доступных ИТ-направлений. 
        </p>
      </div>
      <div className="feed-card" style={feedCardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '14px' }}>АДМИНИСТРАЦИЯ</span>
          <span style={{ color: 'var(--text-secondary)', opacity: 0.6, fontSize: '12px' }}>19.04.2026</span>
        </div>
        <h2 style={{ fontSize: '18px', marginBottom: '10px', color: 'var(--text-primary)' }}>Объявление о дне открытых дверей</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Приветствуем будущих студентов! Мы открываем перед вами двери возможностей! 
        </p>
      </div>
    </div>
  );
};

const feedCardStyle = {
  background: 'var(--bg-sidebar)',
  padding: '24px',
  borderRadius: '12px',
  border: '1px solid var(--border-color)',
  borderLeft: '4px solid var(--accent)', 
  marginBottom: '20px'
};