import { Link } from 'react-router-dom';

function Navbar({ currentUser, onLogout }) {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
            <div>
                <Link to="/" style={{ marginRight: '15px', textDecoration: 'none', fontWeight: 'bold' }}>Inicio</Link>
                {currentUser && (
                    <Link to="/profile" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Mi Perfil</Link>
                )}
            </div>
            
            <div>
                {/* Renderizado condicional según la fuente de verdad (currentUser) */}
                {currentUser ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>Hola, <strong>{currentUser.username}</strong></span>
                        <button onClick={onLogout} style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Registro</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;