import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom'; // O el sistema de ruteo que estés usando (ej: wouter, react-router)

export default function CartPage() {
  const { cartItems, clearCart } = useContext(CartContext);

  // Calcular el precio total de todos los productos en el carrito
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // 4. Renderizado condicional si el carrito está vacío
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-container">
        <h2>Tu carrito está vacío 🛒</h2>
        <p>Parece que aún no has añadido ningún producto.</p>
        <Link to="/" className="btn-back-to-products">
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h2>Resumen de tu Carrito</h2>

      {/* 3. Tabla o lista detallada de productos */}
      <table className="cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio Unitario</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            const subtotal = item.price * item.quantity;
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>${subtotal.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 5. Mostrar el precio total */}
      <div className="cart-summary">
        <h3>Total a pagar: ${totalPrice.toFixed(2)}</h3>
      </div>

      {/* 6. Botón para vaciar el carrito */}
      <div className="cart-actions">
        <button onClick={clearCart} className="btn-clear-cart">
          Vaciar Carrito 🗑️
        </button>
        <Link to="/" className="btn-continue-shopping">
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}