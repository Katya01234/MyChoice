// src/pages/FacultyDetailsPage.tsx
import React from 'react';
import { useFacultyDetails, usePrograms } from '../features/university/hooks/useUniversity';
import type { ProgramResponse } from '../types/university';

interface FacultyDetailsPageProps {
  facultyId: number;
  onProgramClick: (programId: number) => void; // Новый проп для проброса клика вверх
}

export const FacultyDetailsPage: React.FC<FacultyDetailsPageProps> = ({ facultyId, onProgramClick }) => {
  const { data: faculty, isLoading: facultyLoading } = useFacultyDetails(facultyId);
  const { data: programs, isLoading: programsLoading } = usePrograms(facultyId);

  if (facultyLoading || programsLoading) return <div>Загрузка данных факультета...</div>;
  if (!faculty) return <div>Данные факультета не найдены</div>;

  return (
    <div className="faculty-details">
      <h1 style={{ fontSize: '28px', marginBottom: '8px', color: 'var(--text-primary)' }}>
        {faculty.name}
      </h1>
      <p style={{ color: 'var(--accent-color)', fontWeight: 'bold', marginBottom: '24px' }}>
        Рейтинг факультета: {faculty.rating} ★
      </p>

      {faculty.description && (
        <div style={{ color: 'var(--text-primary)', lineHeight: '1.6', marginBottom: '32px' }}>
          {faculty.description}
        </div>
      )}

      <h2 style={{ fontSize: '22px', marginBottom: '16px', color: 'var(--text-primary)' }}>
        Направления подготовки (Программы)
      </h2>

      <div style={{ display: 'grid', gap: '12px' }}>
        {programs && programs.length > 0 ? (
          programs.map((prog: ProgramResponse) => (
            <div 
              key={prog.id}
              onClick={() => onProgramClick(prog.id)} // Триггерим открытие третьего оверлея
              style={{
                padding: '16px',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'transform 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-color)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
            >
              <h4 style={{ fontSize: '16px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                {prog.name}
              </h4>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                Код направления: {prog.direction?.code || 'Н/Д'}
              </p>
            </div>
          ))
        ) : (
          <p style={{ color: 'var(--text-secondary)' }}>Программы обучения пока не указаны</p>
        )}
      </div>
    </div>
  );
};