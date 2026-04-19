import React from 'react';
import './LayoutStructure.css';
import { NavLink, Link } from 'react-router-dom';
import { Search, LayoutGrid, MessageSquareText, Settings, HelpCircle, UserCircle, Award } from 'lucide-react';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
// 1. Импортируем хук для доступа к контексту
import { useAuth } from '../providers/AuthContext'; 

interface MainLayoutProps {
  children?: React.ReactNode;
  onThemeChange: (theme: string) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, onThemeChange }) => {
  // 2. Достаем данные пользователя и состояние загрузки из контекста
  const { user, loading } = useAuth();

  // 3. Формируем отображаемое имя. Больше никакой "Иван Иванов" по умолчанию!
  const displayName = user 
    ? `${user.firstName} ${user.lastName}` 
    : (loading ? 'Загрузка...' : 'Гость');

  return (
    <div className="layout-wrapper">
      <aside className="sidebar">
        <div className="logo">U-Choice</div>
        <nav className="menu">
          <NavLink to="/feed" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
            <LayoutGrid size={20} />
            <span>Лента</span>
          </NavLink>
          <NavLink to="/ratings" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
            <Award size={20} />
            <span>Рейтинги</span>
          </NavLink>
          <NavLink to="/chat" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
            <MessageSquareText size={20} />
            <span>Обсуждения</span>
          </NavLink>
        </nav>
        <div className="menu-footer">
          <NavLink to="/settings" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
            <Settings size={18} />
            <span>Настройки</span>
          </NavLink>
          <NavLink to="/faq" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
            <HelpCircle size={18} />
            <span>FAQ</span>
          </NavLink>
        </div>
      </aside>

      <div className="main-container">
        <header className="top-header">
          <div className="search-bar">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Найти вуз, факультет или институт..." />
          </div>

          <div className="header-actions">
            <ThemeSwitcher onThemeChange={onThemeChange} />
            <Link to="/profile" className="profile-link" style={{ textDecoration: 'none' }}>
              <div className="user-info">
                {/* 4. Теперь здесь всегда актуальное имя из профиля */}
                <span className="user-name">{displayName}</span> 
                <UserCircle size={28} className="user-icon" />
              </div>
            </Link>
          </div>
        </header>

        <main className="content-area">
          {children}
        </main>
      </div>
    </div>
  );
};