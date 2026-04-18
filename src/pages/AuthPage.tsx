import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type UserRole } from '../types/User'; 
import { authApi } from '../features/auth/api/auth';

interface AuthPageProps {
  onLoginSuccess?: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState<string>(''); 
  const [city, setCity] = useState('');
  const [role, setRole] = useState<UserRole>('ABITURIENT');

  const handleSubmit = async () => {
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
        response = await authApi.register({ 
          email, password, firstName, lastName, age: Number(age), city, role 
        });
      }

      if (response.ok) {
        const data = await response.json();
        if (isLogin) {
          const token = data.token;
          if (token) {
            // СНАЧАЛА сохраняем всё в localStorage
            alert('Успешный вход, сохраняем данные в localStorage ' + token);
            localStorage.setItem('token', token);
            if (onLoginSuccess) onLoginSuccess();
            
            navigate('/feed');
          }
        } else {
          alert('Регистрация успешна! Войдите.');
          setIsLogin(true);
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Ошибка: ${errorData.message || 'Неверные данные'}`);
      }
    } catch (error) {
      alert('Ошибка связи с сервером. Проверьте ngrok.');
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
          <input type="email" placeholder="Почта" style={s.input} value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Пароль" style={s.input} value={password} onChange={(e) => setPassword(e.target.value)} />
          {!isLogin && (
            <>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input placeholder="Имя" style={{...s.input, flex: 1}} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input placeholder="Фамилия" style={{...s.input, flex: 1}} value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="number" placeholder="Возраст" style={{...s.input, flex: 1}} value={age} onChange={(e) => setAge(e.target.value)} />
                <input placeholder="Город" style={{...s.input, flex: 1}} value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <select value={role} onChange={(e) => setRole(e.target.value as UserRole)} style={s.input}>
                <option value="ABITURIENT">Абитуриент</option>
                <option value="STUDENT">Студент</option>
                <option value="TEACHER">Преподаватель</option>
              </select>
            </>
          )}
          <button style={s.submitBtn} onClick={handleSubmit} disabled={loading}>{loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Создать аккаунт')}</button>
          <button onClick={() => setIsLogin(!isLogin)} style={s.switchBtn}>{isLogin ? 'Нет аккаунта? Регистрация' : 'Есть аккаунт? Войти'}</button>
        </div>
      </div>
    </div>
  );
};

const s = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-main)' },
  card: { background: 'var(--bg-sidebar)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border-color)', width: '420px' },
  form: { display: 'flex', flexDirection: 'column' as const, gap: '12px' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--md-sys-color-surface-container-highest)', color: 'var(--text-primary)', width: '100%' },
  submitBtn: { padding: '14px', borderRadius: '8px', background: 'var(--accent)', color: 'var(--on-accent)', fontWeight: 'bold' as const, border: 'none', cursor: 'pointer' },
  switchBtn: { background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '13px' }
};