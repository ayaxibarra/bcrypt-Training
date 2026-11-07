import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Consumimos la función login del contexto
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulación de validación o petición de autenticación exitosa
    if (email && password) {
      const userData = { email, name: email.split('@')[0] };
      login(userData); // Actualiza el estado global y localStorage
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar Sesión</h2>
        <div className="form-group">
          <label>Correo electrónico:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="ejemplo@correo.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="********"
            required
          />
        </div>
        <button type="submit" className="btn-submit">Entrar</button>
      </form>
    </div>
  );
}