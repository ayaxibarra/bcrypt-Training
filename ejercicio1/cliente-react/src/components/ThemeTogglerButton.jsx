import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeTogglerButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="theme-toggle-btn">
      Cambiar a modo {theme === 'light' ? 'oscuro 🌙' : 'claro ☀️'}
    </button>
  );
}