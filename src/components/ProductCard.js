import React, { useState } from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate processing
    onAddToCart(product);
    setIsAdding(false);
  };

  return (
    <div 
      style={{
        border: '1px solid #ddd',
        borderRadius: '12px',
        padding: '1.2rem',
        textAlign: 'center',
        boxShadow: isHovered ? '0 8px 25px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        background: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle background animation */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #3498db, #9b59b6, #e74c3c)',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }} />
      
      <div style={{
        width: '100%',
        height: '160px',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #ecf0f1 100%)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem',
        fontSize: '4rem',
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)'
      }}>
        {product.emoji || '📦'}
      </div>
      
      <h3 style={{ 
        margin: '0.5rem 0', 
        color: '#2c3e50',
        fontSize: '1.1rem',
        fontWeight: '600'
      }}>
        {product.name}
      </h3>
      
      <p style={{ 
        color: '#7f8c8d', 
        margin: '0.3rem 0',
        textTransform: 'capitalize',
        fontSize: '0.9rem'
      }}>
        {product.category}
      </p>
      
      <p style={{ 
        fontSize: '1.4rem', 
        fontWeight: 'bold', 
        color: '#27ae60', 
        margin: '0.8rem 0'
      }}>
        ₹{product.price.toLocaleString()}
      </p>
      
      {product.rating && (
        <div style={{ 
          margin: '0.5rem 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.3rem'
        }}>
          <div>
            {'⭐'.repeat(Math.floor(product.rating))}
            {product.rating % 1 !== 0 && '⭐'}
          </div>
          <span style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>({product.rating})</span>
        </div>
      )}
      
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        style={{
          background: isAdding ? '#95a5a6' : (isHovered ? '#2980b9' : '#3498db'),
          color: 'white',
          border: 'none',
          padding: '0.8rem 1.5rem',
          borderRadius: '25px',
          cursor: isAdding ? 'not-allowed' : 'pointer',
          fontSize: '1rem',
          width: '100%',
          marginTop: '1rem',
          transition: 'all 0.3s ease',
          fontWeight: '500',
          transform: isAdding ? 'scale(0.95)' : 'scale(1)'
        }}
      >
        {isAdding ? '🔄 Adding...' : '🛒 Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;