import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import ProductList from './components/ProductList';

// Un subcomponente interno que SÍ está dentro de los Providers
function MainContent() {
  const { currentUser } = useContext(AuthContext); // ✅ Aquí ya funciona porque está dentro

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        {currentUser ? <ProductList /> : <LoginPage />}
      </main>
    </div>
  );
}

// App principal que provee el contexto
export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </AuthProvider>
  );
}