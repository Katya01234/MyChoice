import { useState, useEffect } from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { FeedPage } from './pages/FeedPage';
import { RatingsPage } from './pages/RatingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthPage } from './pages/AuthPage'; 

function App() {
  const [theme, setTheme] = useState('dark-medium-contrast'); 
  
  // Проверяем, есть ли токен в локальном хранилище
  // Используем !! для превращения строки в булево значение (true/false)
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div id="app-root" className={theme}>
      <BrowserRouter>
        <Routes>
          {/* 1. Если пользователь НЕ авторизован, любой путь кидает его на /auth */}
          {!isAuthenticated ? (
            <>
              <Route path="/auth" element={<AuthPage />} />
              {/* Все остальные пути перенаправляют на страницу входа */}
              <Route path="*" element={<Navigate to="/auth" replace />} />
            </>
          ) : (
            /* 2. Если пользователь авторизован — показываем систему */
            <Route 
              path="/*" 
              element={
                <MainLayout onThemeChange={setTheme}>
                  <Routes>
                    <Route path="/feed" element={<FeedPage />} />
                    <Route path="/ratings" element={<RatingsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/" element={<Navigate to="/feed" replace />} />
                    <Route path="*" element={<Navigate to="/feed" replace />} />
                  </Routes>
                </MainLayout>
              } 
            />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;