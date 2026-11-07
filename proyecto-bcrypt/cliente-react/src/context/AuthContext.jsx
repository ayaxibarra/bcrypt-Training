
import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

// 1. Creamos el Context
export const AuthContext = createContext(null);

// 2. Creamos el Provider
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    // 3. Recuperamos la sesión al iniciar la aplicación
    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            try {
                const decodedUser = jwtDecode(token);

                // Comprobamos si el token expiró
                if (decodedUser.exp && decodedUser.exp * 1000 <= Date.now()) {
                    localStorage.removeItem('authToken');
                } else {
                    setCurrentUser(decodedUser);
                }
            } catch (error) {
                console.error('Token inválido:', error);
                localStorage.removeItem('authToken');
            }
        }

        setAuthLoading(false);
    }, []);

    // 4. Función Login
    const login = (token) => {
        const decodedUser = jwtDecode(token);

        if (decodedUser.exp && decodedUser.exp * 1000 <= Date.now()) {
            throw new Error('El token recibido ya expiró.');
        }

        localStorage.setItem('authToken', token);
        setCurrentUser(decodedUser);
    };

    // 5. Función Logout
    const logout = () => {
        localStorage.removeItem('authToken');
        setCurrentUser(null);
    };

    // 6. Compartimos el estado y las funciones
    const value = {
        currentUser,
        login,
        logout,
        authLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// 7. Hook personalizado para consumir el Context
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth debe utilizarse dentro de un AuthProvider.');
    }

    return context;
}
