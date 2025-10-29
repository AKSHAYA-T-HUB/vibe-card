import React, { useState } from 'react';

const Cart = ({ cart, onUpdateQuantity, onRemoveItem, onClose, onCheckout }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing
    onCheckout();
    setIsCheckingOut(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '420px',
      height: '100vh',
      background: 'white',
      boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      animation: 'slideInRight 0.3s ease-out'
    }}>
      <div style={{
        padding: '1.5rem',
        borderBottom: '2px solid #ecf0f1',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.3rem' }}>🛒 Your Cart</h2>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.9rem', opacity: 0.9 }}>
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </p>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1.2rem',
            transition: 'all 0.2s ease'
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '1rem' }}>
        {cart.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem 1rem',
            color: '#7f8c8d'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Your cart is empty</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Add some amazing products to get started!</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem 0',
              borderBottom: '1px solid #ecf0f1',
              transition: 'all 0.2s ease'
            }}>
              <div style={{ 
                fontSize: '2.5rem', 
                marginRight: '1rem',
                background: '#f8f9fa',
                borderRadius: '8px',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {item.emoji || '📦'}
              </div>
              
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 0.3rem 0', fontSize: '1rem' }}>{item.name}</h4>
                <p style={{ margin: 0, color: '#7f8c8d', fontSize: '0.9rem' }}>
                  ₹{item.price.toLocaleString()} each
                </p>
                <p style={{ margin: '0.2rem 0 0 0', color: '#27ae60', fontSize: '0.9rem', fontWeight: '600' }}>
                  ₹{(item.price * item.qty).toLocaleString()} total
                </p>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.qty - 1)}
                  style={{
                    background: '#ecf0f1',
                    border: 'none',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  -
                </button>
                
                <span style={{ 
                  minWidth: '25px', 
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: '1.1rem'
                }}>
                  {item.qty}
                </span>
                
                <button
                  onClick={() => onUpdateQuantity(item.id, item.qty + 1)}
                  style={{
                    background: '#3498db',
                    color: 'white',
                    border: 'none',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  +
                </button>
                
                <button
                  onClick={() => onRemoveItem(item.id)}
                  style={{
                    background: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    padding: '0.4rem 0.6rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    marginLeft: '0.5rem',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div style={{
          padding: '1.5rem',
          borderTop: '2px solid #ecf0f1',
          background: '#f8f9fa'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            padding: '1rem',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div>
              <p style={{ margin: 0, color: '#7f8c8d', fontSize: '0.9rem' }}>Total Amount</p>
              <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: 'bold', color: '#2c3e50' }}>
                ₹{total.toLocaleString()}
              </p>
            </div>
            <div style={{ fontSize: '2rem' }}>💰</div>
          </div>
          
          <button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            style={{
              background: isCheckingOut ? '#95a5a6' : 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
              color: 'white',
              border: 'none',
              padding: '1rem 1.5rem',
              borderRadius: '25px',
              cursor: isCheckingOut ? 'not-allowed' : 'pointer',
              width: '100%',
              fontSize: '1.1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              transform: isCheckingOut ? 'scale(0.98)' : 'scale(1)',
              boxShadow: '0 4px 15px rgba(39, 174, 96, 0.3)'
            }}
          >
            {isCheckingOut ? '🔄 Processing...' : '🚀 Proceed to Checkout'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;