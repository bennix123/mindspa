import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      className="dark-mode-toggle"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="toggle-icon">
        {isDarkMode ? (
          <span className="sun-icon">☀️</span>
        ) : (
          <span className="moon-icon">🌙</span>
        )}
      </div>
    </button>
  );
};

export default DarkModeToggle;

