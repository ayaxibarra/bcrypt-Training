import React, { createContext, useState, useEffect } from 'react';

// 1. Crear y exportar el AuthContext
export const AuthContext = createContext();

// 2. Crear el componente AuthProvider
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // useEffect que revisa localStorage al cargar la app
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error al parsear el usuario de localStorage', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  // Función login
  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  // Función logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}