import React from 'react';
import { type University } from '../types/University';

interface Props {
  data: University;
}

export const UniversityCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="uni-card" style={{
      background: 'var(--bg-sidebar)',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '16px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>{data.name}</h3>
        <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{data.rating}</span>
      </div>
      <p style={{ color: 'var(--text-secondary)' }}>{data.city}</p>
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        {data.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};