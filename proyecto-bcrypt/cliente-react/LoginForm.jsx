import { useState } from 'react';

function LoginForm() {
    // 1. Estado para los datos del login (email y password)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // 2. Tu función handleSubmit adaptada del tutorial
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData), // formData contiene { email, password }
            });
     
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Error en el login');
     
            // ¡Éxito! Aquí recibimos el token (o los datos) desde el backend.
            console.log('Login exitoso, token:', data.token);
            alert(`¡Bienvenido de nuevo, ${data.username || 'usuario'}!`);
            
            // Opcional: guardar el token en localStorage para futuras peticiones
            localStorage.setItem('token', data.token);
     
        } catch (error) {
            alert(`Error en el login: ${error.message}`);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Correo electrónico:</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <button type="submit" style={{ padding: '10px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Ingresar
                </button>
            </form>
        </div>
    );
}

export default LoginForm;