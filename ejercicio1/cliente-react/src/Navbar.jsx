import { Link } from 'react-router-dom';

function Navbar({ currentUser, onLogout }) {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
            <div>
                <Link to="/" style={{ marginRight: '15px', textDecoration: 'none', fontWeight: 'bold' }}>Inicio</Link>
                {currentUser && (
                    <Link to="/profile" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Mi Perfil</Link>
                )}
            </div>
            
            <div>
                {currentUser ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span>Hola, <strong>{currentUser.username}</strong></span>
                        <button onClick={onLogout} style={{ padding: '6px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                        <Link to="/register" style={{ textDecoration: 'none' }}>Registro</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;