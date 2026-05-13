// src/features/university/components/FacultyCard.tsx
import React from 'react';

interface FacultyCardProps {
  name: string;
  rating: number;
  onClick: () => void;
}

export const FacultyCard: React.FC<FacultyCardProps> = ({ name, rating, onClick }) => {
  return (
    <div 
      onClick={onClick}
      style={{
        padding: '20px',
        background: 'var(--bg-sidebar)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'transform 0.2s, border-color 0.2s',
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-color)'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
    >
      <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '8px' }}>{name}</h3>
      <div style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>
        Рейтинг: {rating} ★
      </div>
    </div>
  );
};