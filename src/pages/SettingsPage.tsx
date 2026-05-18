// src/pages/SettingsPage.tsx
import React, { useState } from 'react';
import { Shield, Bell, Sliders, Check, Save, Lock, Mail } from 'lucide-react';
import { useAuth } from '../providers/AuthContext';

export const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'account' | 'preferences' | 'notifications'>('account');

  // Состояния для вкладки Аккаунт
  const [email, setEmail] = useState(user?.email || 'anastasia_it@university.edu');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Состояния для параметров поступления (Предпочтения)
  const [learningForm, setLearningForm] = useState<'budget' | 'commercial'>('budget');
  const [egeSum, setEgeSum] = useState<number>(275);

  // Состояния для уведомлений
  const [notifyNews, setNotifyNews] = useState(true);
  const [notifyChat, setNotifyChat] = useState(true);

  // Список доступных тегов направлений
  const availableDirections = [
    '09.03.01 Информатика и ВТ',
    '09.03.02 Информационные системы',
    '09.03.03 Прикладная информатика',
    '09.03.04 Программная инженерия',
    '10.03.01 Информационная безопасность',
    '01.03.02 Прикладная математика'
  ];
  const [selectedDirections, setSelectedDirections] = useState<string[]>([
    '09.03.01 Информатика и ВТ',
    '09.03.04 Программная инженерия'
  ]);

  const toggleDirection = (dir: string) => {
    if (selectedDirections.includes(dir)) {
      setSelectedDirections(selectedDirections.filter(d => d !== dir));
    } else {
      setSelectedDirections([...selectedDirections, dir]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Параметры успешно обновлены!');
  };

  // Стили интерактивных элементов
  const tabStyle = (isActive: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '12px 16px',
    background: isActive ? 'var(--accent-color)' : 'transparent',
    color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.7)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'left' as const,
    fontWeight: 500,
    fontSize: '14px',
    transition: 'all 0.25s ease-in-out',
  });

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '14px',
    marginTop: '6px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const selectBtnStyle = (isActive: boolean) => ({
    flex: 1,
    padding: '10px',
    background: isActive ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.03)',
    color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '14px',
    transition: 'all 0.2s ease',
  });

  return (
    <div className="page-content" style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>Настройки</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '32px' }}>
        
        {/* Левое меню */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button type="button" style={tabStyle(activeTab === 'account')} onClick={() => setActiveTab('account')}>
            <Shield size={18} />
            <span>Аккаунт и безопасность</span>
          </button>
          <button type="button" style={tabStyle(activeTab === 'preferences')} onClick={() => setActiveTab('preferences')}>
            <Sliders size={18} />
            <span>Параметры поступления</span>
          </button>
          <button type="button" style={tabStyle(activeTab === 'notifications')} onClick={() => setActiveTab('notifications')}>
            <Bell size={18} />
            <span>Уведомления</span>
          </button>
        </div>

        {/* Правая панель контента */}
        <div style={{ 
          background: 'var(--bg-sidebar)', 
          borderRadius: '16px', 
          padding: '24px', 
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
        }}>
          <form onSubmit={handleSave}>
            
            {/* ВКЛАДКА 1: Аккаунт и безопасность */}
            {activeTab === 'account' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 500 }}>Управление аккаунтом</h3>
                
                <label style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14} /> Email адрес</div>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
                </label>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '10px 0' }} />
                
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lock size={16} /> Изменение пароля
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <label style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>
                    Текущий пароль
                    <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} style={inputStyle} placeholder="••••••••" />
                  </label>
                  <label style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>
                    Новый пароль
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} style={inputStyle} placeholder="Минимум 6 знаков" />
                  </label>
                </div>
              </div>
            )}

            {/* ВКЛАДКА 2: Параметры поступления */}
            {activeTab === 'preferences' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 500 }}>Критерии подбора вузов</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>Форма обучения</span>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                      <button type="button" style={selectBtnStyle(learningForm === 'budget')} onClick={() => setLearningForm('budget')}>Бюджет</button>
                      <button type="button" style={selectBtnStyle(learningForm === 'commercial')} onClick={() => setLearningForm('commercial')}>Платное</button>
                    </div>
                  </div>

                  <label style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>
                    Сумма баллов ЕГЭ (с ИД)
                    <input type="number" value={egeSum} onChange={e => setEgeSum(Number(e.target.value))} style={inputStyle} min={100} max={310} />
                  </label>
                </div>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '10px 0' }} />

                <div>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 500 }}>Интересующие направления ИТ</h4>
                  <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>Отметьте коды ОКСО, чтобы фильтровать списки программ на страницах университетов.</p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {availableDirections.map(dir => {
                      const isSelected = selectedDirections.includes(dir);
                      return (
                        <div
                          key={dir}
                          onClick={() => toggleDirection(dir)}
                          style={{
                            padding: '8px 14px',
                            borderRadius: '20px',
                            fontSize: '13px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            border: isSelected ? '1px solid var(--accent-color)' : '1px solid rgba(255, 255, 255, 0.1)',
                            background: isSelected ? 'rgba(var(--accent-color-rgb), 0.15)' : 'rgba(255, 255, 255, 0.02)',
                            color: isSelected ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.7)',
                            transition: 'all 0.2s ease-in-out'
                          }}
                        >
                          {isSelected && <Check size={14} />}
                          {dir}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ВКЛАДКА 3: Уведомления */}
            {activeTab === 'notifications' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 500 }}>Уведомления на платформе</h3>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '14px', 
                  background: 'rgba(255, 255, 255, 0.02)', 
                  borderRadius: '8px', 
                  border: '1px solid rgba(255, 255, 255, 0.04)' 
                }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500 }}>Новые публикации в Ленте</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '2px' }}>Уведомлять о важных анонсах приемной кампании</div>
                  </div>
                  <button type="button" style={{ width: '40px', height: '22px', background: notifyNews ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.15)', borderRadius: '11px', position: 'relative', cursor: 'pointer', border: 'none', padding: 0, transition: 'all 0.25s' }} onClick={() => setNotifyNews(!notifyNews)}>
                    <div style={{ width: '16px', height: '16px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '3px', left: notifyNews ? '21px' : '3px', transition: 'all 0.25s' }} />
                  </button>
                </div>

                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '14px', 
                  background: 'rgba(255, 255, 255, 0.02)', 
                  borderRadius: '8px', 
                  border: '1px solid rgba(255, 255, 255, 0.04)' 
                }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500 }}>Ответы в Обсуждениях</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '2px' }}>Когда кто-то отвечает на ваш вопрос или запускает новый тред</div>
                  </div>
                  <button type="button" style={{ width: '40px', height: '22px', background: notifyChat ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.15)', borderRadius: '11px', position: 'relative', cursor: 'pointer', border: 'none', padding: 0, transition: 'all 0.25s' }} onClick={() => setNotifyChat(!notifyChat)}>
                    <div style={{ width: '16px', height: '16px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '3px', left: notifyChat ? '21px' : '3px', transition: 'all 0.25s' }} />
                  </button>
                </div>
              </div>
            )}

            {/* Общая кнопка Сохранить */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '28px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <button
                type="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'var(--accent-color)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '14px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <Save size={16} />
                Сохранить параметры
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};