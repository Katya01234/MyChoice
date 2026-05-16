// src/pages/UniversitiesPage.tsx
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { UniversityCard } from '../features/auth/components/UniversityCard';
import { useUniversities } from '../features/university/hooks/useUniversity';
import { UniversityDetailsPage } from './UniversityDetailsPage';
import { FacultyDetailsPage } from './FacultyDetailsPage';
import { ProgramDetailsPage } from './ProgramDetailsPage'; // Импортируем новый оверлей

export const UniversitiesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUniId, setSelectedUniId] = useState<number | null>(null);
  const [selectedFacultyId, setSelectedFacultyId] = useState<number | null>(null);
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(null); // Третий стейт
  const [isFocused, setIsFocused] = useState(false);

  const { data, isLoading } = useUniversities(0, 50);

  const filteredUniversities = data?.content.filter(uni =>
    uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uni.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Сброс абсолютно всех панелей при глобальном закрытии
  const closeAll = () => {
    setSelectedUniId(null);
    setSelectedFacultyId(null);
    setSelectedProgramId(null);
  };

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

      {/* СЛОЙ 1: Детали Университета */}
      {selectedUniId && (
        <div className="details-overlay" onClick={closeAll}>
          <div className="details-modal" onClick={(e) => e.stopPropagation()}>
            <button className="back-button" onClick={closeAll}>
              <X size={20} />
              <span>Назад к списку</span>
            </button>
            <UniversityDetailsPage 
              universityId={selectedUniId} 
              onFacultyClick={(id) => setSelectedFacultyId(id)} 
            />
          </div>
        </div>
      )}

      {/* СЛОЙ 2: Детали Факультета */}
      {selectedFacultyId && (
        <div 
          className="details-overlay faculty-overlay" 
          onClick={() => { setSelectedFacultyId(null); setSelectedProgramId(null); }}
        >
          <div className="details-modal" onClick={(e) => e.stopPropagation()}>
            <button className="back-button" onClick={() => { setSelectedFacultyId(null); setSelectedProgramId(null); }}>
              <X size={20} />
              <span>Назад к университету</span>
            </button>
            <FacultyDetailsPage 
              facultyId={selectedFacultyId} 
              onProgramClick={(id) => setSelectedProgramId(id)} // Ловим клик по программе
            />
          </div>
        </div>
      )}

      {/* СЛОЙ 3: Детали Программы (самый верхний слой за счет повышенного z-index) */}
      {selectedProgramId && (
        <div 
          className="details-overlay program-overlay" 
          onClick={() => setSelectedProgramId(null)} // Клик мимо закрывает только программу
        >
          <div className="details-modal" onClick={(e) => e.stopPropagation()}>
            <button className="back-button" onClick={() => setSelectedProgramId(null)}>
              <X size={20} />
              <span>Назад к факультету</span>
            </button>
            <ProgramDetailsPage programId={selectedProgramId} />
          </div>
        </div>
      )}
    </div>
  );
};