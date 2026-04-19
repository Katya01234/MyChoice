import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { UniversityCard } from '../features/auth/components/UniversityCard';

// Описываем структуру данных
interface University {
  id: number;
  name: string;
  city: string;
  rating: number;
  tags: string[];
}

export const UniversitiesPage: React.FC = () => {
  const [query, setQuery] = useState('');

  const universities: University[] = [
    { id: 1, name: 'МГТУ им. Н.Э. Баумана', city: 'Москва', rating: 4.9, tags: ['ИТ', 'Инженерия'] },
    { id: 2, name: 'ИТМО', city: 'Санкт-Петербург', rating: 4.8, tags: ['ИТ', 'Робототехника'] },
    { id: 3, name: 'МФТИ', city: 'Долгопрудный', rating: 5.0, tags: ['Физика', 'ИТ'] },
  ];

  // Фильтрация данных по поисковому запросу
  const filteredUniversities = universities.filter(uni => 
    uni.name.toLowerCase().includes(query.toLowerCase()) ||
    uni.city.toLowerCase().includes(query.toLowerCase()) ||
    uni.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="page-content" style={{ justifyContent: 'flex-start' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '16px' }}>Поиск университетов</h1>
        
        <div className="search-bar" style={searchBarContainerStyle}>
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Название, город или направление..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={gridStyle}>
        {filteredUniversities.map(uni => (
          <UniversityCard 
            key={uni.id}
            name={uni.name}
            city={uni.city}
            rating={uni.rating}
            tags={uni.tags}
            onClick={() => console.log(`Клик по ${uni.name}`)}
          />
        ))}
      </div>
    </div>
  );
};

// Стили страницы
const searchBarContainerStyle: React.CSSProperties = {
  maxWidth: '600px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '0 12px',
  background: 'var(--bg-sidebar)',
  borderRadius: '8px',
  border: '1px solid var(--border-color)',
  height: 'auto'
};

const inputStyle: React.CSSProperties = {
  fontSize: '16px',
  width: '100%',
  padding: '12px 8px',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: 'var(--text-primary)',
  lineHeight: '1.5'
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '20px',
  alignItems: 'stretch'
};