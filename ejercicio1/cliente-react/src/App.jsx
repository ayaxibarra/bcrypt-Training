import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Navbar from './Navbar';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import ProtectedRoute from './ProtectedRoute';

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    // 1. Revisar si hay un token en localStorage al cargar la app por primera vez
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setCurrentUser(decodedUser);
            } catch (error) {
                // Si el token es corrupto o inválido, lo borramos
                localStorage.removeItem('authToken');
            }
        }
    }, []);

    // 2. Función de Logout
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setCurrentUser(null);
    };

    return (
        <Router>
            <div style={{ fontFamily: 'sans-serif' }}>
                <Navbar currentUser={currentUser} onLogout={handleLogout} />

                <Routes>
                    <Route path="/" element={<h2 style={{ textAlign: 'center' }}>Bienvenido a la Home Pública</h2>} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage onLoginSuccess={(user) => setCurrentUser(user)} />} />
                    
                    {/* 3. Ruta protegida con el componente ProtectedRoute */}
                    <Route 
                        path="/profile" 
                        element={
                            <ProtectedRoute currentUser={currentUser}>
                                <ProfilePage />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;