
import { createContext, useContext, useState } from 'react';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems((prevItems) => {
            // Buscamos si el producto ya existe en el carrito
            const existingItem = prevItems.find(
                (item) => item._id === productToAdd._id
            );

            if (existingItem) {
                // Si existe, incrementamos su cantidad
                return prevItems.map((item) =>
                    item._id === productToAdd._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            // Si es nuevo, lo agregamos con cantidad inicial 1
            return [
                ...prevItems,
                { ...productToAdd, quantity: 1 }
            ];
        });
    };

    const value = {
        cartItems,
        addItemToCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

// Hook personalizado para consumir el contexto
export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart debe utilizarse dentro de un CartProvider.');
    }

    return context;
}
