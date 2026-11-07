import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addItemToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image" 
        style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }} 
      />
      <div className="product-info" style={{ marginTop: '10px' }}>
        <h3>{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button 
          onClick={() => addItemToCart(product)} 
          className="btn-add-to-cart"
        >
          Añadir al Carrito 🛒
        </button>
      </div>
    </div>
  );
}