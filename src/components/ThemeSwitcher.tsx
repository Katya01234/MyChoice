import React, { useState, useEffect } from 'react';
import { Sun, Moon, Palette } from 'lucide-react';

// Список твоих рабочих тем
const themes = [
  'light',
  'light-medium-contrast',
  'dark',
  'dark-medium-contrast',
  'dark-high-contrast'
];

export const ThemeSwitcher = ({ onThemeChange }: { onThemeChange: (theme: string) => void }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const toggleTheme = () => {
    const nextIdx = (currentIdx + 1) % themes.length;
    setCurrentIdx(nextIdx);
    onThemeChange(themes[nextIdx]);
  };

  return (
    <button 
      onClick={toggleTheme}
      style={{
        background: 'var(--md-sys-color-surface-container-high)',
        border: '1px solid var(--border-color)',
        color: 'var(--text-primary)',
        padding: '8px 12px',
        borderRadius: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center', // Исправлено: alignItems
        gap: '8px',
        fontSize: '13px',
        fontWeight: 500
      }}
    >
      {themes[currentIdx].includes('dark') ? <Moon size={16} /> : <Sun size={16} />}
      <span style={{ textTransform: 'capitalize' }}>
        {themes[currentIdx].replace(/-/g, ' ')}
      </span>
    </button>
  );
};