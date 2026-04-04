import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type UserRole } from '../types/User'; // Проверь регистр в названии файла (User.ts или user.ts)
import { authApi } from '../features/auth/api/auth';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Основные поля (для входа и регистрации)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // НОВЫЕ ПОЛЯ для регистрации (из api-docs-v2.json)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState<string>(''); // Храним как строку для инпута
  const [city, setCity] = useState('');
  const [role, setRole] = useState<UserRole>('ABITURIENT');

  const handleSubmit = async () => {
    // Валидация пароля
    if (password.length < 6) {
      alert('Пароль должен быть не менее 6 символов');
      return;
    }

    setLoading(true);
    try {
      let response;
      
      if (isLogin) {
        response = await authApi.login({ email, password });
      } else {
        // Отправляем все 6 обязательных полей при регистрации
        response = await authApi.register({ 
          email, 
          password, 
          firstName, 
          lastName, 
          age: Number(age), // Бэкенд ждет число (integer)
          city,
          role 
        });
      }

      if (response.ok) {
        const data = await response.json();
        if (data && data.token) {
           localStorage.setItem('token', data.token);
           localStorage.setItem('userName', `${data.firstName || ''} ${data.lastName || ''}`.trim());
           navigate('/feed');
        } else if (!isLogin) {
           alert('Регистрация успешна! Теперь войдите.');
           setIsLogin(true);
        }
      } else {
        const errorData = await response.json();
        alert(`Ошибка: ${errorData.message || 'Проверьте заполнение полей'}`);
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('Ошибка сети: проверьте бэкенд');
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

          {/* Блок дополнительных полей, которые видны только при регистрации */}
          {!isLogin && (
            <>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  placeholder="Имя" 
                  style={{...s.input, flex: 1}} 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input 
                  placeholder="Фамилия" 
                  style={{...s.input, flex: 1}} 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="number"
                  placeholder="Возраст" 
                  style={{...s.input, flex: 1}} 
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <input 
                  placeholder="Город" 
                  style={{...s.input, flex: 1}} 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              
              <div style={{ marginTop: '10px' }}>
                <p style={{ fontSize: '13px', marginBottom: '8px', color: 'var(--text-secondary)' }}>
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
            </>
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

const s = {
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    background: 'var(--bg-main)' 
  },
  card: { 
    background: 'var(--bg-sidebar)', 
    padding: '40px', 
    borderRadius: '16px', 
    border: '1px solid var(--border-color)', 
    width: '420px', // Немного увеличил ширину для новых полей
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
  },
  form: { display: 'flex', flexDirection: 'column' as const, gap: '12px' },
  input: { 
    padding: '12px', 
    borderRadius: '8px', 
    border: '1px solid var(--border-color)', 
    background: 'var(--md-sys-color-surface-container-highest)', 
    color: 'var(--text-primary)',
    outline: 'none',
    width: '100%'
  },
  submitBtn: { 
    padding: '14px', 
    borderRadius: '8px', 
    background: 'var(--accent)', 
    color: 'var(--on-accent)', 
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