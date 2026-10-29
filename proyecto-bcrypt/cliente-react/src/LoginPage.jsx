import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage(props) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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

            // 1. Guardamos el token en el localStorage
            localStorage.setItem('authToken', data.token); 

            // 2. Actualizamos el estado del componente padre (App.js) con los datos del usuario
            props.onLoginSuccess(data.user); 

            alert(`¡Login exitoso! Bienvenido ${data.user.username}`);
            
            // 3. Opcional: Redirigir al perfil o inicio
            navigate('/profile');

        } catch (error) {
            alert(`Error en el login: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Correo electrónico" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    style={{ padding: '8px' }}
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Contraseña" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                    style={{ padding: '8px' }}
                />
                <button type="submit" style={{ padding: '10px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default LoginPage;