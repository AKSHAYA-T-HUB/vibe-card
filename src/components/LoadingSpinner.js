import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60vh',
      gap: '1rem'
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '4px solid #ecf0f1',
        borderTop: '4px solid #3498db',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>
        Loading amazing products for you...
      </p>
    </div>
  );
};

export default LoadingSpinner;