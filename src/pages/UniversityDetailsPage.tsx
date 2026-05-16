import React from 'react';
import { useUniversityDetails, useFaculties } from '../features/university/hooks/useUniversity';
import { FacultyCard } from '../features/university/components/FacultyCard';

interface Props {
  universityId: number;
  onFacultyClick: (facultyId: number) => void;
}

export const UniversityDetailsPage: React.FC<Props> = ({ universityId, onFacultyClick }) => {
  const { data: uni, isLoading: uniLoading } = useUniversityDetails(universityId);
  const { data: faculties } = useFaculties(universityId);

  if (uniLoading) return <div>Загрузка данных...</div>;
  if (!uni) return <div>Данные не найдены</div>;

  return (
    <div>
      <h1 style={{ fontSize: '32px', marginBottom: '8px', color: 'var(--text-primary)' }}>{uni.name}</h1>
      <p style={{ color: 'var(--text-secondary)' }}>{uni.city} • Рейтинг {uni.rating} ★</p>
      
      <div style={{ marginTop: '24px', color: 'var(--text-primary)', lineHeight: '1.7' }}>
        {uni.description}
      </div>

      <h2 style={{ marginTop: '40px', marginBottom: '16px', color: 'var(--text-primary)' }}>Факультеты</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        {faculties?.map(fac => (
          <FacultyCard 
            key={fac.id} 
            name={fac.name} 
            rating={fac.rating} 
            onClick={() => onFacultyClick(fac.id)}
          />
        ))}
      </div>
    </div>
  );
};