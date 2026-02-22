import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
  const { isLightMode, toggleTheme } = useTheme();

  return (
    <button
      className="dark-mode-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={isLightMode ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <div className="toggle-icon">
        {isLightMode ? (
          <span className="moon-icon">🌙</span>
        ) : (
          <span className="sun-icon">☀️</span>
        )}
      </div>
    </button>
  );
};

export default DarkModeToggle;
