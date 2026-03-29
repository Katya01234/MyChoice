import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Search, LayoutGrid, MessageSquareText, Settings, HelpCircle, UserCircle, Award } from 'lucide-react';
import { MOCK_USER_PROFILE } from '../config/mockData';
import { ThemeSwitcher } from '../components/ThemeSwitcher'; // Импортируем!

interface MainLayoutProps {
  children?: React.ReactNode;
  onThemeChange: (theme: string) => void;
}

// Используем интерфейс MainLayoutProps здесь
export const MainLayout: React.FC<MainLayoutProps> = ({ children, onThemeChange }) => {
  return (
    <div className="layout-wrapper">
      {/* Сайдбар теперь просто стоит первым в Flex-контейнере */}
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

      {/* main-container автоматически займет все оставшееся место справа */}
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
                <span className="user-name">{MOCK_USER_PROFILE.fullName}</span> 
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