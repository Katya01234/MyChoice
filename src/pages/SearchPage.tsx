// src/pages/SearchPage.tsx
import { UniversityCard } from '../components/UniversityCard';
import { MOCK_UNIVERSITIES } from '../config/mockData';

export const SearchPage = () => {
  return (
    <div className="search-page">
      <h2 style={{ marginBottom: '24px' }}>Доступные направления</h2>
      
      <div className="university-list">
        {MOCK_UNIVERSITIES.map((uni) => (
          <UniversityCard key={uni.id} data={uni} />
        ))}
      </div>
    </div>
  );
};