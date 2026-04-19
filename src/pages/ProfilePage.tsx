import React, { useEffect, useState } from 'react';
import { UserCircle, Mail, MapPin, Calendar, LogOut, Edit2, Check, X } from 'lucide-react';
import { userApi } from '../features/auth/api/user';
import type { UserProfile } from '../types/User';
// 1. Импортируем хук контекста
import { useAuth } from '../providers/AuthContext';

export const ProfilePage: React.FC = () => {
  // 2. Берем данные и функции из контекста
  const { user, updateUser, logout, loading: authLoading } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserProfile | null>(null);

  // Синхронизируем локальную форму с данными из контекста при загрузке
  useEffect(() => {
    if (user) {
      setEditedUser(user);
    }
  }, [user]);

  const handleSave = async () => {
    if (!editedUser) return;
    try {
      setLoading(true);
      // Отправляем изменения на бэкенд
      const response = await userApi.updateMe(editedUser.email, editedUser);
      
      if (response.ok) {
        // 3. ОБЯЗАТЕЛЬНО: Обновляем глобальный контекст
        // Это заставит Header в MainLayout перерисоваться с новым именем
        updateUser(editedUser); 
        setIsEditing(false);
      } else {
        alert('Не удалось сохранить изменения');
      }
    } catch (error) {
      alert('Ошибка при сохранении');
    } finally {
      setLoading(false);
    }
  };

  // Если контекст еще грузит юзера, показываем спиннер
  if (authLoading && !user) return <div className="page-content">Загрузка данных...</div>;
  
  if (!user) return (
    <div className="page-content">
      <p>Профиль не доступен. Попробуйте перезайти.</p>
      <button onClick={logout} style={logoutBtnStyle}>Вернуться на вход</button>
    </div>
  );

  return (
    <div className="page-content profile-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', color: 'var(--text-primary)', margin: 0 }}>Мой профиль</h1>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} style={editBtnStyle}>
              <Edit2 size={18} /> Редактировать
            </button>
          ) : (
            <>
              <button onClick={handleSave} style={saveBtnStyle} disabled={loading}>
                <Check size={18} /> {loading ? 'Сохранение...' : 'Сохранить'}
              </button>
              <button onClick={() => { setIsEditing(false); setEditedUser(user); }} style={cancelBtnStyle}>
                <X size={18} /> Отмена
              </button>
            </>
          )}
          <button onClick={logout} style={logoutBtnStyle}>
            <LogOut size={18} /> Выйти
          </button>
        </div>
      </div>
      
      <div className="profile-header-card" style={headerCardStyle}>
        <div style={{ color: 'var(--accent)' }}><UserCircle size={90} strokeWidth={1} /></div>
        <div>
          {isEditing ? (
            <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
              <input 
                style={inputStyle} 
                value={editedUser?.firstName || ''} 
                onChange={e => setEditedUser(prev => prev ? {...prev, firstName: e.target.value} : null)}
                placeholder="Имя"
              />
              <input 
                style={inputStyle} 
                value={editedUser?.lastName || ''} 
                onChange={e => setEditedUser(prev => prev ? {...prev, lastName: e.target.value} : null)}
                placeholder="Фамилия"
              />
            </div>
          ) : (
            <h2 style={{ fontSize: '32px', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
              {user.firstName} {user.lastName}
            </h2>
          )}
          <div style={{ color: 'var(--accent)', fontWeight: 'bold' }}>
            @{user.username || user.email.split('@')[0]}
          </div>
        </div>
      </div>

      <div className="profile-details-card" style={detailsCardStyle}>
        <DetailItem 
          icon={<Mail size={20}/>} 
          label="Электронная почта" 
          value={user.email} 
        />
        
        <DetailItem 
          icon={<MapPin size={20}/>} 
          label="Город" 
          isEditing={isEditing}
          value={user.city}
          input={
            <input 
              style={inputStyle} 
              value={editedUser?.city || ''} 
              onChange={e => setEditedUser(prev => prev ? {...prev, city: e.target.value} : null)} 
            />
          }
        />
        
        <DetailItem 
          icon={<Calendar size={20}/>} 
          label="Возраст" 
          isEditing={isEditing}
          value={`${user.age} лет`}
          input={
            <input 
              type="number" 
              style={inputStyle} 
              value={editedUser?.age || 0} 
              onChange={e => setEditedUser(prev => prev ? {...prev, age: Number(e.target.value)} : null)} 
            />
          }
        />
      </div>
    </div>
  );
};

// Вспомогательный компонент для пунктов деталей
const DetailItem = ({ icon, label, value, isEditing, input }: any) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{ color: 'var(--accent)' }}>{icon}</div>
    <div style={{ flex: 1 }}>
      <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>{label}</p>
      {isEditing && input ? (
        <div style={{ marginTop: '4px' }}>{input}</div>
      ) : (
        <p style={{ margin: 0, fontSize: '16px', color: 'var(--text-primary)', fontWeight: 500 }}>{value}</p>
      )}
    </div>
  </div>
);

// Стили
const commonBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 20px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 500,
  transition: 'all 0.2s',
  border: '1px solid transparent'
};

const logoutBtnStyle = { ...commonBtnStyle, border: '1px solid #ff4d4f', color: '#ff4d4f', background: 'transparent' };
const editBtnStyle = { ...commonBtnStyle, background: 'var(--accent)', color: 'var(--on-accent)', border: 'none' };
const saveBtnStyle = { ...commonBtnStyle, background: '#52c41a', color: 'white', border: 'none' };
const cancelBtnStyle = { ...commonBtnStyle, background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' };

const inputStyle = {
  padding: '8px 12px',
  borderRadius: '6px',
  border: '1px solid var(--border-color)',
  background: 'var(--bg-main)',
  color: 'var(--text-primary)',
  fontSize: '14px',
  width: '100%'
};

const headerCardStyle = { padding: '40px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '24px', background: 'var(--bg-sidebar)', border: '1px solid var(--border-color)' };
const detailsCardStyle = { padding: '32px', borderRadius: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', background: 'var(--bg-sidebar)', border: '1px solid var(--border-color)' };