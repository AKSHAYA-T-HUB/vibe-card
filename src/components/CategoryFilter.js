import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div style={{
      padding: '1rem 2rem',
      background: '#ecf0f1',
      borderBottom: '1px solid #bdc3c7'
    }}>
      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>Categories:</span>
        
        <button
          onClick={() => onCategoryChange('all')}
          style={{
            background: selectedCategory === 'all' ? '#3498db' : 'white',
            color: selectedCategory === 'all' ? 'white' : '#2c3e50',
            border: '1px solid #3498db',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          All Products
        </button>
        
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            style={{
              background: selectedCategory === category ? '#3498db' : 'white',
              color: selectedCategory === category ? 'white' : '#2c3e50',
              border: '1px solid #3498db',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              textTransform: 'capitalize'
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;