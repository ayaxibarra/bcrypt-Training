import { useState, useEffect } from 'react';

function ProfilePage() {
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
                        'Authorization': `Bearer ${token}` // Enviando el token en el encabezado
                    }
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.message || 'Error al obtener el perfil');

                setProfile(data.user);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div style={{ maxWidth: '400px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Panel de Perfil (Protegido)</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {profile ? (
                <div style={{ background: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
                    <p><strong>ID:</strong> {profile.id || profile._id}</p>
                    <p><strong>Usuario:</strong> {profile.username}</p>
                    <p style={{ color: 'green', fontWeight: 'bold' }}>¡Autenticado con éxito desde el backend!</p>
                </div>
            ) : (
                !error && <p>Cargando información del perfil...</p>
            )}
        </div>
    );
}

export default ProfilePage;