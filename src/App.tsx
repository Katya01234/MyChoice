import { useState, useEffect } from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { FeedPage } from './pages/FeedPage';
import { RatingsPage } from './pages/RatingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthPage } from './pages/AuthPage'; 

function App() {
  const [theme, setTheme] = useState('dark-medium-contrast'); 
  
  // Состояние авторизации
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

  // Синхронизация между вкладками
  useEffect(() => {
    const handleStorage = () => setIsAuth(!!localStorage.getItem('token'));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div id="app-root" className={theme}>
      <BrowserRouter>
        <Routes>
          {!isAuth ? (
            <>
              {/* Передаем функцию setIsAuth(true) в AuthPage */}
              <Route path="/auth" element={<AuthPage onLoginSuccess={() => setIsAuth(true)} />} />
              <Route path="*" element={<Navigate to="/auth" replace />} />
            </>
          ) : (
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