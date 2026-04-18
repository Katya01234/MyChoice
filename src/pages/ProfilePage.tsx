import React, { useEffect, useState } from 'react';
import { UserCircle, Mail, MapPin, Calendar, LogOut } from 'lucide-react';
import { authApi } from '../features/auth/api/auth';

export const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/auth'; // Жесткий редирект для сброса всех состояний
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authApi.getMe();
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          if (data.firstName && data.lastName) {
             localStorage.setItem('userName', `${data.username}`);
          }
        }
      } catch (error) {
        console.error("Ошибка профиля:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="page-content">Загрузка данных...</div>;
  
  if (!user) return (
    <div className="page-content">
      <p>Профиль не доступен. Попробуйте перезайти.</p>
      <button onClick={handleLogout} style={logoutBtnStyle}>Вернуться на вход</button>
    </div>
  );

  return (
    <div className="page-content profile-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', color: 'var(--text-primary)', margin: 0 }}>Мой профиль</h1>
        <button onClick={handleLogout} style={logoutBtnStyle}>
          <LogOut size={18} />
          Выйти
        </button>
      </div>
      
      <div className="profile-header-card" style={headerCardStyle}>
        <div style={{ color: 'var(--accent)' }}><UserCircle size={90} strokeWidth={1} /></div>
        <div>
          <h2 style={{ fontSize: '32px', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
            {user.firstName} {user.lastName}
          </h2>
          <div style={{ color: 'var(--accent)', fontWeight: 'bold' }}>@{user.username}</div>
        </div>
      </div>

      <div className="profile-details-card" style={detailsCardStyle}>
        <DetailItem icon={<Mail size={20}/>} label="Электронная почта" value={user.email} />
        <DetailItem icon={<MapPin size={20}/>} label="Город" value={user.city} />
        <DetailItem icon={<Calendar size={20}/>} label="Возраст" value={`${user.age} лет`} />
      </div>
    </div>
  );
};

const logoutBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 20px',
  borderRadius: '8px',
  border: '1px solid #ff4d4f',
  color: '#ff4d4f',
  background: 'transparent',
  cursor: 'pointer',
  fontWeight: 500,
  transition: 'all 0.2s'
};

// Стили карточек из твоего кода
const headerCardStyle = { padding: '40px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '24px', background: 'var(--bg-sidebar)', border: '1px solid var(--border-color)' };
const detailsCardStyle = { padding: '32px', borderRadius: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', background: 'var(--bg-sidebar)', border: '1px solid var(--border-color)' };

const DetailItem = ({ icon, label, value }: any) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{ color: 'var(--accent)' }}>{icon}</div>
    <div>
      <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>{label}</p>
      <p style={{ margin: 0, fontSize: '16px', color: 'var(--text-primary)', fontWeight: 500 }}>{value}</p>
    </div>
  </div>
);