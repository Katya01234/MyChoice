import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type UserRole } from '../types/User';
import { authApi } from '../features/auth/api/auth'; // Импортируем твой сервис

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('ABITURIENT');
  const [loading, setLoading] = useState(false); // Состояние загрузки
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // 1. Валидация на фронтенде (согласно api-docs.json)
    if (password.length < 6) {
      alert('Пароль должен быть не менее 6 символов');
      return;
    }

    setLoading(true);
    try {
      // 2. Используем созданный authApi
      const response = isLogin 
        ? await authApi.login({ email, password })
        : await authApi.register({ email, password, role });

      if (response.ok) {
        const data = await response.json();
        
        // Бэкенд возвращает Map<String, String>, проверяем наличие токена
        if (data && data.token) {
           localStorage.setItem('token', data.token);
           // Можно также сохранить email или роль, если бэкенд их присылает
           navigate('/feed');
        } else if (!isLogin) {
           // Если это регистрация и токен не пришел сразу — переключаем на логин
           alert('Регистрация успешна! Теперь войдите.');
           setIsLogin(true);
        }
      } else {
        const errorData = await response.json();
        alert(`Ошибка: ${errorData.message || 'Неверные данные'}`);
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('Ошибка сети: проверьте, запущен ли бэкенд на порту 8081');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={s.container}>
      <div className="auth-card" style={s.card}>
        <h2 style={{ marginBottom: '24px', textAlign: 'center', color: 'var(--text-primary)' }}>
          {isLogin ? 'Вход в систему' : 'Регистрация'}
        </h2>

        <div style={s.form}>
          <input 
            type="email" 
            placeholder="Почта" 
            style={s.input} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input 
            type="password" 
            placeholder="Пароль (мин. 6 симв.)" 
            style={s.input} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          {!isLogin && (
            <div style={{ marginTop: '10px' }}>
              <p style={{ fontSize: '13px', marginBottom: '10px', color: 'var(--text-secondary)' }}>
                Кто вы?
              </p>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value as UserRole)}
                style={s.input}
                disabled={loading}
              >
                <option value="ABITURIENT">Абитуриент</option>
                <option value="STUDENT">Студент</option>
                <option value="TEACHER">Преподаватель</option>
                <option value="ADMIN">Админ</option>
              </select>
            </div>
          )}

          <button 
            style={{...s.submitBtn, opacity: loading ? 0.7 : 1}} 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Подождите...' : (isLogin ? 'Войти' : 'Создать аккаунт')}
          </button>

          <button 
            onClick={() => setIsLogin(!isLogin)} 
            style={s.switchBtn}
            disabled={loading}
          >
            {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Стили оставляем без изменений, они у тебя уже отлично настроены под темы!

// ... стили s остаются прежними
const s = {
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    background: 'var(--bg-main)' // ЗАМЕНИЛИ #0a0c10
  },
  card: { 
    background: 'var(--bg-sidebar)', // Ссылается на surface-container
    padding: '40px', 
    borderRadius: '16px', 
    border: '1px solid var(--border-color)', 
    width: '380px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
  },
  form: { display: 'flex', flexDirection: 'column' as const, gap: '12px' },
  input: { 
    padding: '12px', 
    borderRadius: '8px', 
    border: '1px solid var(--border-color)', 
    background: 'var(--md-sys-color-surface-container-highest)', // Инпуты теперь тоже в теме
    color: 'var(--text-primary)',
    outline: 'none'
  },
  roleGrid: { display: 'flex', flexDirection: 'column' as const, gap: '8px' },
  roleLabel: { fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  submitBtn: { 
    padding: '14px', 
    borderRadius: '8px', 
    background: 'var(--accent)', 
    color: 'var(--on-accent)', // Авто-контраст текста (черный или белый)
    fontWeight: 'bold' as const, 
    border: 'none', 
    cursor: 'pointer', 
    marginTop: '10px' 
  },
  switchBtn: { 
    background: 'none', 
    border: 'none', 
    color: 'var(--accent)', 
    cursor: 'pointer', 
    fontSize: '13px', 
    marginTop: '10px' 
  }
};