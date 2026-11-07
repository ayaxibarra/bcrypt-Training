import React, { createContext, useState } from 'react';

// 1. Crear el ThemeContext
export const ThemeContext = createContext();

// 2. Crear el componente ThemeProvider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}