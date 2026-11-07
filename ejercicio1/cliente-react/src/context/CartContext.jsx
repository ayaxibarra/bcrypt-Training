import React, { createContext, useState } from 'react';

// 1. Crear y exportar el CartContext
export const CartContext = createContext();

// 2. Crear el componente CartProvider
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Función addItemToCart con lógica de existencia y cantidades
  const addItemToCart = (product) => {
    setCartItems((prevItems) => {
      // Comprobamos si el producto ya existe en el carrito
      const existingProduct = prevItems.find((item) => item.id === product.id);

      if (existingProduct) {
        // Si ya existe, usamos .map() para actualizar únicamente la quantity incrementándola en 1
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no existe, lo añadimos con quantity: 1 usando el operador spread
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Función clearCart para vaciar el carrito por completo
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}