import React from 'react';

const Header = ({ cartCount, onCartToggle, searchTerm, onSearchChange }) => {
  return (
    <header style={{
      background: '#2c3e50',
      color: 'white',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ margin: 0, fontSize: '1.8rem' }}>🛒 VibeCart</h1>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: 'none',
            width: '200px'
          }}
        />
        
        <button
          onClick={onCartToggle}
          style={{
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          🛒 Cart ({cartCount})
        </button>
      </div>
    </header>
  );
};

export default Header;