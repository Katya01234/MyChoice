import { useState } from 'react'; // Не забудь импорт!
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { FeedPage } from './pages/FeedPage';
import { RatingsPage } from './pages/RatingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthPage } from './pages/AuthPage'; 

// App.tsx
function App() {
  const [theme, setTheme] = useState('dark-medium-contrast'); 

  return (
    <div id="app-root" className={theme}>
      <BrowserRouter>
        <Routes>
          {/* Страница входа ВСЕГДА должна быть вне MainLayout */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Все остальные маршруты */}
          <Route 
            path="/*" 
            element={
              <MainLayout onThemeChange={setTheme}>
                <Routes>
                  {/* Если зашли на главную, кидаем на ленту */}
                  <Route path="/" element={<Navigate to="/feed" replace />} />
                  <Route path="/feed" element={<FeedPage />} />
                  <Route path="/ratings" element={<RatingsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  {/* Если ввели несуществующий путь внутри системы — тоже на ленту */}
                  <Route path="*" element={<Navigate to="/feed" replace />} />
                </Routes>
              </MainLayout>
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;