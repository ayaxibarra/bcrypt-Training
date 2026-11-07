import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
  // Consumimos la función addItemToCart del contexto del carrito
  const { addItemToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        
        {/* Botón con evento onClick que pasa el objeto producto */}
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