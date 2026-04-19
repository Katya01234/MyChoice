import React from 'react';
import './LayoutStructure.css';
import { NavLink, Link, useNavigate } from 'react-router-dom'; // 1. Импортируем useNavigate
import { Search, LayoutGrid, MessageSquareText, Settings, HelpCircle, UserCircle, Award } from 'lucide-react';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { useAuth } from '../providers/AuthContext'; 

interface MainLayoutProps {
  children?: React.ReactNode;
  onThemeChange: (theme: string) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, onThemeChange }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate(); // 2. Вызываем хук внутри компонента

  // 3. Переносим логику поиска внутрь компонента
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const query = e.currentTarget.value.trim();
      if (query.startsWith('@')) {
        const username = query.substring(1); 
        navigate(`/profile/${username}`);
        e.currentTarget.value = ''; // Очищаем поле после поиска
      }
    }
  };

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
          <div className="header-left-space"></div> 
            <div className="header-actions">
              <ThemeSwitcher onThemeChange={onThemeChange} />
              <Link to="/profile" className="profile-link" style={{ textDecoration: 'none' }}>
                <div className="user-info">
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