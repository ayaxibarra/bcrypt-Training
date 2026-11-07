import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  
  // Consumimos cartItems del CartContext
  const { cartItems } = useContext(CartContext);

  // Calculamos el número total de ítems sumando las cantidades
  const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-brand">Mi Aplicación</div>
      
      <div className="navbar-actions">
        {/* Indicador del Carrito */}
        <div className="cart-indicator" style={{ marginRight: '20px', cursor: 'pointer' }}>
          🛒 Carrito <span className="badge">{totalItemsCount}</span>
        </div>

        {currentUser ? (
          <div className="user-info">
            <span>Hola, {currentUser.name || currentUser.email}</span>
            <button onClick={logout} className="btn-logout">Cerrar Sesión</button>
          </div>
        ) : (
          <span>Por favor, inicia sesión</span>
        )}
      </div>
    </nav>
  );
}