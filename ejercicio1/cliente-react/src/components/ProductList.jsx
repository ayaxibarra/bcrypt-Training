import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList() {
  // Lista de productos de ejemplo
  const sampleProducts = [
    { id: 1, name: 'Auriculares Inalámbricos', price: 45.99, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Teclado Mecánico RGB', price: 79.99, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Mouse Ergonómico', price: 29.99, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Monitor 24" Full HD', price: 159.99, image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="product-list-container" style={{ padding: '20px' }}>
      <h2>Catálogo de Productos</h2>
      <div 
        className="products-grid" 
        style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}
      >
        {sampleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}