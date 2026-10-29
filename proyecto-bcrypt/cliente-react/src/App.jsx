import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importamos la librería para leer el token
import Navbar from './Navbar';
import './App.css';

// Componente de Registro interno (o puedes importarlo si lo tienes en otro archivo)
function RegisterForm() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Error en el registro');
            
            alert(`¡Registro exitoso para ${data.username}! Por favor, inicia sesión.`);
            navigate('/login');
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Crear Cuenta</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input type="text" name="username" placeholder="Usuario" value={formData.username} onChange={handleChange} required style={{ padding: '8px' }} />
                <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required style={{ padding: '8px' }} />
                <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required style={{ padding: '8px' }} />
                <button type="submit" style={{ padding: '10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>Registrarse</button>
            </form>
        </div>
    );
}

// Componente de Login interno
function LoginForm({ onLoginSuccess }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Error en el login');

            // Guardamos el token y actualizamos el estado global
            localStorage.setItem('authToken', data.token);
            onLoginSuccess(data.user);

            alert(`¡Bienvenido de nuevo, ${data.user.username}!`);
            navigate('/profile');
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required style={{ padding: '8px' }} />
                <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required style={{ padding: '8px' }} />
                <button type="submit" style={{ padding: '10px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '4px' }}>Ingresar</button>
            </form>
        </div>
    );
}

// Componente de Perfil Protegido
function UserProfile() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) throw new Error('No hay sesión activa.');

                const response = await fetch('http://localhost:5000/api/users/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.message || 'Error al obtener perfil');

                setProfile(data.user);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <h2>Perfil Protegido</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {profile ? (
                <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '6px' }}>
                    <p><strong>ID:</strong> {profile._id}</p>
                    <p><strong>Usuario:</strong> {profile.username}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p style={{ color: 'green', fontWeight: 'bold' }}>¡Autenticado mediante JWT y Middleware!</p>
                </div>
            ) : (
                !error && <p>Cargando datos privados...</p>
            )}
        </div>
    );
}

// Componente Principal App
function App() {
    const [currentUser, setCurrentUser] = useState(null);

    // 1. Persistencia al recargar la página (F5)
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setCurrentUser(decodedUser);
            } catch (error) {
                // Si el token es inválido o expiró, lo limpiamos
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
            <div style={{ maxWidth: '450px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'sans-serif' }}>
                <Navbar currentUser={currentUser} onLogout={handleLogout} />

                <Routes>
                    <Route path="/" element={<h2>¡Bienvenido a la App de Autenticación Segura!</h2>} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm onLoginSuccess={(user) => setCurrentUser(user)} />} />
                    <Route path="/profile" element={<UserProfile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;