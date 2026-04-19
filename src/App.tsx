import { useState } from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { FeedPage } from './pages/FeedPage';
import { RatingsPage } from './pages/RatingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthPage } from './pages/AuthPage'; 
// Импортируем провайдер и хук
import { AuthProvider, useAuth } from './providers/AuthContext';

// Создаем отдельный компонент для роутинга, чтобы использовать useAuth
const AppContent = ({ theme, setTheme }: { theme: string, setTheme: (t: string) => void }) => {
  const { user, loading } = useAuth();
  
  // Пока контекст проверяет токен и грузит юзера, показываем заглушку
  if (loading) {
    return <div className={`loading-screen ${theme}`}>Загрузка...</div>;
  }

  return (
    <div id="app-root" className={theme}>
      <BrowserRouter>
        <Routes>
          {!user ? (
            <>
              {/* Больше не нужно прокидывать setIsAuth вручную! */}
              <Route path="/auth" element={<AuthPage />} />
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
                    <Route path="/profile/:username" element={<ProfilePage />} />
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
};

function App() {
  const [theme, setTheme] = useState('dark-medium-contrast'); 

  return (
    <AuthProvider>
      <AppContent theme={theme} setTheme={setTheme} />
    </AuthProvider>
  );
}

export default App;