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

  // Стили интерактивных элементов с поддержкой Material 3 High Contrast
  const tabStyle = (isActive: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '12px 16px',
    background: isActive ? 'var(--md-sys-color-primary-container)' : 'transparent',
    color: isActive ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-background)',
    border: isActive ? '1px solid var(--md-sys-color-outline)' : '1px solid transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'left' as const,
    fontWeight: isActive ? 600 : 500,
    fontSize: '14px',
    transition: 'all 0.2s ease-in-out',
  });

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    background: 'var(--md-sys-color-surface-container)',
    border: '1px solid var(--md-sys-color-outline)',
    borderRadius: '8px',
    color: 'var(--md-sys-color-on-surface)',
    fontSize: '14px',
    marginTop: '6px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const selectBtnStyle = (isActive: boolean) => ({
    flex: 1,
    padding: '10px',
    background: isActive ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface-container)',
    color: isActive ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface-variant)',
    border: '1px solid var(--md-sys-color-outline)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '14px',
    transition: 'all 0.2s ease',
  });

  return (
    <div className="page-content" style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto', color: 'var(--md-sys-color-on-background)' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: 'var(--md-sys-color-on-background)' }}>Настройки</h1>

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
          background: 'var(--md-sys-color-surface-container-low)', 
          borderRadius: '16px', 
          padding: '24px', 
          border: '1px solid var(--md-sys-color-outline-variant)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
        }}>
          <form onSubmit={handleSave}>
            
            {/* ВКЛАДКА 1: Аккаунт и безопасность */}
            {activeTab === 'account' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 500, color: 'var(--md-sys-color-on-surface)' }}>Управление аккаунтом</h3>
                
                <label style={{ fontSize: '13px', color: 'var(--md-sys-color-on-surface-variant)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--md-sys-color-on-surface)' }}><Mail size={14} /> Email адрес</div>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
                </label>

                <div style={{ height: '1px', background: 'var(--md-sys-color-outline-variant)', margin: '10px 0' }} />
                
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--md-sys-color-on-surface)' }}>
                  <Lock size={16} /> Изменение пароля
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <label style={{ fontSize: '13px', color: 'var(--md-sys-color-on-surface-variant)' }}>
                    Текущий пароль
                    <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} style={inputStyle} placeholder="••••••••" />
                  </label>
                  <label style={{ fontSize: '13px', color: 'var(--md-sys-color-on-surface-variant)' }}>
                    Новый пароль
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} style={inputStyle} placeholder="Минимум 6 знаков" />
                  </label>
                </div>
              </div>
            )}

            {/* ВКЛАДКА 2: Параметры поступления */}
            {activeTab === 'preferences' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 500, color: 'var(--md-sys-color-on-surface)' }}>Критерии подбора вузов</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <span style={{ fontSize: '13px', color: 'var(--md-sys-color-on-surface-variant)' }}>Форма обучения</span>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                      <button type="button" style={selectBtnStyle(learningForm === 'budget')} onClick={() => setLearningForm('budget')}>Бюджет</button>
                      <button type="button" style={selectBtnStyle(learningForm === 'commercial')} onClick={() => setLearningForm('commercial')}>Платное</button>
                    </div>
                  </div>

                  <label style={{ fontSize: '13px', color: 'var(--md-sys-color-on-surface-variant)' }}>
                    Сумма баллов ЕГЭ (с ИД)
                    <input type="number" value={egeSum} onChange={e => setEgeSum(Number(e.target.value))} style={inputStyle} min={100} max={310} />
                  </label>
                </div>

                <div style={{ height: '1px', background: 'var(--md-sys-color-outline-variant)', margin: '10px 0' }} />

                <div>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 500, color: 'var(--md-sys-color-on-surface)' }}>Интересующие направления ИТ</h4>
                  <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: 'var(--md-sys-color-on-surface-variant)' }}>Отметьте коды ОКСО, чтобы фильтровать списки программ на страницах университетов.</p>
                  
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
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            border: '1px solid var(--md-sys-color-outline)',
                            background: isSelected ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface-container)',
                            color: isSelected ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface-variant)',
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
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 500, color: 'var(--md-sys-color-on-surface)' }}>Уведомления на платформе</h3>
                
                {/* Тоггл 1 */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '14px', 
                  background: 'var(--md-sys-color-surface-container)', 
                  borderRadius: '8px', 
                  border: '1px solid var(--md-sys-color-outline-variant)' 
                }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--md-sys-color-on-surface)' }}>Новые публикации в Ленте</div>
                    <div style={{ fontSize: '12px', color: 'var(--md-sys-color-on-surface-variant)', marginTop: '2px' }}>Уведомлять о важных анонсах приемной кампании</div>
                  </div>
                  <button type="button" style={{ width: '40px', height: '22px', background: notifyNews ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface-bright)', borderRadius: '11px', position: 'relative', cursor: 'pointer', border: '1px solid var(--md-sys-color-outline)', padding: 0, transition: 'all 0.25s' }} onClick={() => setNotifyNews(!notifyNews)}>
                    <div style={{ width: '16px', height: '16px', background: notifyNews ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-outline-variant)', borderRadius: '50%', position: 'absolute', top: '2px', left: notifyNews ? '21px' : '3px', transition: 'all 0.25s' }} />
                  </button>
                </div>

                {/* Тоггл 2 */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '14px', 
                  background: 'var(--md-sys-color-surface-container)', 
                  borderRadius: '8px', 
                  border: '1px solid var(--md-sys-color-outline-variant)' 
                }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--md-sys-color-on-surface)' }}>Ответы в Обсуждениях</div>
                    <div style={{ fontSize: '12px', color: 'var(--md-sys-color-on-surface-variant)', marginTop: '2px' }}>Когда кто-то отвечает на ваш вопрос или запускает новый тред</div>
                  </div>
                  <button type="button" style={{ width: '40px', height: '22px', background: notifyChat ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface-bright)', borderRadius: '11px', position: 'relative', cursor: 'pointer', border: '1px solid var(--md-sys-color-outline)', padding: 0, transition: 'all 0.25s' }} onClick={() => setNotifyChat(!notifyChat)}>
                    <div style={{ width: '16px', height: '16px', background: notifyChat ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-outline-variant)', borderRadius: '50%', position: 'absolute', top: '2px', left: notifyChat ? '21px' : '3px', transition: 'all 0.25s' }} />
                  </button>
                </div>
              </div>
            )}

            {/* Общая кнопка Сохранить */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '28px', paddingTop: '16px', borderTop: '1px solid var(--md-sys-color-outline-variant)' }}>
              <button
                type="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'var(--md-sys-color-primary-container)',
                  color: 'var(--md-sys-color-on-primary-container)',
                  border: '1px solid var(--md-sys-color-outline)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600,
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