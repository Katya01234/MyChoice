import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserCircle, Mail, MapPin, Calendar, LogOut, Edit2, Check, X } from 'lucide-react';
import type { UserProfile } from '../types/User';
import { useAuth } from '../providers/AuthContext';
// Импортируем наши новые хуки из файла api/user.ts
import { useProfile, useUpdateProfile } from '../features/auth/api/user';

export const ProfilePage: React.FC = () => {
  const { username: urlUsername } = useParams<{ username: string }>(); 
  const { user: currentUser, updateUser, logout } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserProfile | null>(null);

  const isMyProfile = !urlUsername || urlUsername === currentUser?.username;

  // 1. Используем React Query для получения данных
  const { 
    data: viewedUser, 
    isLoading: profileLoading, 
    isError 
  } = useProfile(urlUsername, isMyProfile);

  // 2. Используем мутацию для сохранения
  const updateMutation = useUpdateProfile();

  // Синхронизируем данные для формы редактирования
  useEffect(() => {
    if (viewedUser && isMyProfile) {
      setEditedUser(viewedUser);
    }
  }, [viewedUser, isMyProfile]);

  const handleSave = async () => {
    if (!editedUser) return;
    
    updateMutation.mutate({ 
      userId: editedUser.email, 
      data: editedUser 
    }, {
      onSuccess: (updatedData) => {
        updateUser(updatedData); 
        setIsEditing(false);
      },
      onError: () => alert('Ошибка при сохранении')
    });
  };

  // Обработка состояний загрузки и ошибок
  if (profileLoading) return <div className="page-content">Загрузка...</div>;
  if (isError || !viewedUser) return <div className="page-content">Пользователь не найден</div>;

  return (
    <div className="page-content profile-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', color: 'var(--text-primary)', margin: 0 }}>
          {isMyProfile ? 'Мой профиль' : `Профиль ${viewedUser.firstName}`}
        </h1>
        
        {isMyProfile && (
          <div style={{ display: 'flex', gap: '12px' }}>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} style={editBtnStyle}>
                <Edit2 size={18} /> Редактировать
              </button>
            ) : (
              <>
                <button onClick={handleSave} style={saveBtnStyle} disabled={updateMutation.isPending}>
                  <Check size={18} /> {updateMutation.isPending ? 'Сохранение...' : 'Сохранить'}
                </button>
                <button onClick={() => { setIsEditing(false); setEditedUser(currentUser); }} style={cancelBtnStyle}>
                  <X size={18} /> Отмена
                </button>
              </>
            )}
            <button onClick={logout} style={logoutBtnStyle}><LogOut size={18} /> Выйти</button>
          </div>
        )}
      </div>
      
      {/* Шапка профиля */}
      <div className="profile-header-card" style={headerCardStyle}>
        <div style={{ color: 'var(--accent)' }}><UserCircle size={90} strokeWidth={1} /></div>
        <div>
          {isEditing ? (
            <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
              <input style={inputStyle} value={editedUser?.firstName || ''} onChange={e => setEditedUser(p => p ? {...p, firstName: e.target.value} : null)} />
              <input style={inputStyle} value={editedUser?.lastName || ''} onChange={e => setEditedUser(p => p ? {...p, lastName: e.target.value} : null)} />
            </div>
          ) : (
            <h2 style={{ fontSize: '32px', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
              {viewedUser.firstName} {viewedUser.lastName}
            </h2>
          )}
          <div style={{ color: 'var(--accent)', fontWeight: 'bold' }}>@{viewedUser.username}</div>
        </div>
      </div>

      {/* Детали профиля */}
      <div className="profile-details-card" style={detailsCardStyle}>
        {isMyProfile && viewedUser.email && (
          <DetailItem icon={<Mail size={20}/>} label="Электронная почта" value={viewedUser.email} />
        )}
        
        <DetailItem 
          icon={<MapPin size={20}/>} 
          label="Город" 
          isEditing={isEditing}
          value={viewedUser.city}
          input={<input style={inputStyle} value={editedUser?.city || ''} onChange={e => setEditedUser(p => p ? {...p, city: e.target.value} : null)} />}
        />
        
        {isMyProfile && viewedUser.age && (
          <DetailItem 
            icon={<Calendar size={20}/>} 
            label="Возраст" 
            isEditing={isEditing}
            value={`${viewedUser.age} лет`}
            input={<input type="number" style={inputStyle} value={editedUser?.age || 0} onChange={e => setEditedUser(p => p ? {...p, age: Number(e.target.value)} : null)} />}
          />
        )}
      </div>
    </div>
  );
};

// Вспомогательный компонент (DetailItem) и стили оставляем как у тебя в коде...
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

// Стили из твоего оригинала...
const commonBtnStyle = { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s', border: '1px solid transparent' };
const logoutBtnStyle = { ...commonBtnStyle, border: '1px solid #ff4d4f', color: '#ff4d4f', background: 'transparent' };
const editBtnStyle = { ...commonBtnStyle, background: 'var(--accent)', color: 'var(--on-accent)', border: 'none' };
const saveBtnStyle = { ...commonBtnStyle, background: '#52c41a', color: 'white', border: 'none' };
const cancelBtnStyle = { ...commonBtnStyle, background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' };
const inputStyle = { padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '14px', width: '100%' };
const headerCardStyle = { padding: '40px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '24px', background: 'var(--bg-sidebar)', border: '1px solid var(--border-color)' };
const detailsCardStyle = { padding: '32px', borderRadius: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', background: 'var(--bg-sidebar)', border: '1px solid var(--border-color)' };