import React from 'react';
import { MapPin, Star } from 'lucide-react';

interface UniversityCardProps {
  name: string;
  city: string;
  rating: number;
  tags: string[];
  onClick?: () => void;
}

export const UniversityCard: React.FC<UniversityCardProps> = ({ name, city, rating, tags, onClick }) => {
  return (
    <div className="uni-card" style={cardStyle} onClick={onClick}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
        <h3 style={nameStyle}>{name}</h3>
        <div style={ratingContainerStyle}>
          <Star size={16} fill="#fadb14" stroke="#fadb14" />
          <span style={ratingTextStyle}>{rating}</span>
        </div>
      </div>
      
      <div style={locationStyle}>
        <MapPin size={14} />
        {city}
      </div>

      <div style={tagsWrapperStyle}>
        {tags.map(tag => (
          <span key={tag} style={tagStyle}>{tag}</span>
        ))}
      </div>
    </div>
  );
};

// Стили с явной типизацией
const cardStyle: React.CSSProperties = {
  background: 'var(--bg-sidebar)',
  padding: '20px',
  borderRadius: '12px',
  border: '1px solid var(--border-color)',
  transition: 'transform 0.2s, border-color 0.2s',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};

const nameStyle: React.CSSProperties = { 
  margin: 0, 
  fontSize: '18px', 
  color: 'var(--text-primary)', 
  flex: 1 
};

const ratingContainerStyle: React.CSSProperties = { 
  display: 'flex', 
  alignItems: 'center', 
  gap: '4px' 
};

const ratingTextStyle: React.CSSProperties = { 
  fontWeight: 'bold', 
  color: 'var(--text-primary)', 
  fontSize: '14px' 
};

const locationStyle: React.CSSProperties = { 
  display: 'flex', 
  alignItems: 'center', 
  gap: '6px', 
  color: 'var(--text-secondary)', 
  fontSize: '14px', 
  margin: '8px 0 16px 0' 
};

const tagsWrapperStyle: React.CSSProperties = { 
  display: 'flex', 
  gap: '8px', 
  flexWrap: 'wrap', 
  marginTop: 'auto' 
};

const tagStyle: React.CSSProperties = { 
  padding: '4px 10px', 
  background: 'var(--bg-main)', 
  borderRadius: '6px', 
  fontSize: '12px', 
  color: 'var(--accent)', 
  border: '1px solid var(--accent)' 
};