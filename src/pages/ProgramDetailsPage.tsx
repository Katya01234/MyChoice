// src/pages/ProgramDetailsPage.tsx
import React from 'react';
import { useProgramDetails } from '../features/university/hooks/useUniversity';

interface ProgramDetailsPageProps {
  programId: number;
}

// Хелпер для красивого вывода академической степени
const getDegreeLabel = (degree: string) => {
  switch (degree) {
    case 'BACHELOR': return 'Бакалавриат';
    case 'MASTER': return 'Магистратура';
    case 'PHD': return 'Аспирантура / Докторантура';
    default: return degree;
  }
};

export const ProgramDetailsPage: React.FC<ProgramDetailsPageProps> = ({ programId }) => {
  const { data: program, isLoading } = useProgramDetails(programId);

  if (isLoading) return <div>Загрузка данных программы...</div>;
  if (!program) return <div>Данные программы не найдены</div>;

  return (
    <div className="program-details">
      <span style={{
        display: 'inline-block',
        padding: '4px 12px',
        background: 'var(--accent-color)',
        color: '#fff',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
        marginBottom: '12px'
      }}>
        {getDegreeLabel(program.degree)}
      </span>

      <h1 style={{ fontSize: '26px', marginBottom: '8px', color: 'var(--text-primary)' }}>
        {program.name}
      </h1>

      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
        Код направления: <strong style={{ color: 'var(--text-primary)' }}>{program.direction?.code || 'Н/Д'}</strong> ({program.direction?.name})
      </p>

      <p style={{ color: 'var(--accent-color)', fontWeight: 'bold', marginBottom: '24px' }}>
        Рейтинг программы: {program.rating} ★
      </p>

      {program.description && (
        <div style={{ color: 'var(--text-primary)', lineHeight: '1.6', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>О программе</h3>
          <p>{program.description}</p>
        </div>
      )}

      {/* <div style={{ 
        padding: '16px', 
        background: 'var(--bg-main)', 
        border: '1px solid var(--border-color)', 
        borderRadius: '8px',
        fontSize: '14px',
        color: 'var(--text-secondary)'
      }}>
        Институциональная принадлежность: {program.faculty?.name || 'Факультет'}
      </div> */}
    </div>
  );
};