// src/pages/UniversitiesPage.tsx
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { UniversityCard } from '../features/auth/components/UniversityCard';
import { useUniversities } from '../features/university/hooks/useUniversity';
import { UniversityDetailsPage } from './UniversityDetailsPage';

export const UniversitiesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUniId, setSelectedUniId] = useState<number | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const { data, isLoading } = useUniversities(0, 50);

  const filteredUniversities = data?.content.filter(uni =>
    uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uni.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-content" style={{ position: 'relative', minHeight: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '16px' }}>
          Поиск университетов
        </h1>
        <div className={`search-bar-inline ${isFocused ? 'active' : ''}`}>
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Название или город..." 
            value={searchQuery}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {(isFocused || searchQuery.length > 0) && (
        <div className="results-container">
          {isLoading ? (
            <div className="loading-text">Загрузка университетов...</div>
          ) : filteredUniversities && filteredUniversities.length > 0 ? (
            <div className="university-grid">
              {filteredUniversities.map(uni => (
                <UniversityCard 
                  key={uni.id}
                  name={uni.name}
                  city={uni.city}
                  rating={uni.rating}
                  tags={[uni.city]} 
                  onClick={() => setSelectedUniId(uni.id)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-text">Ничего не найдено</div>
          )}
        </div>
      )}

      {/* Исправленный Overlay */}
      {selectedUniId && (
        <div 
          className="details-overlay" 
          onClick={() => setSelectedUniId(null)} // Закрытие при клике на область слева
        >
          <div 
            className="details-modal" 
            onClick={(e) => e.stopPropagation()} // Чтобы клик внутри модалки не закрывал её
          >
            <button className="back-button" onClick={() => setSelectedUniId(null)}>
              <X size={20} />
              <span>Назад к списку</span>
            </button>
            <UniversityDetailsPage universityId={selectedUniId} />
          </div>
        </div>
      )}
    </div>
  );
};
